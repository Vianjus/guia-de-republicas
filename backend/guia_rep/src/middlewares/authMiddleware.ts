import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
};
