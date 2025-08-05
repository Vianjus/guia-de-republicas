import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

export function validateBody(schema: ZodTypeAny) {
  return ((req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Dados inválidos",
        detalhes: result.error.issues.map((err) => ({
          campo: err.path.join("."),
          mensagem: err.message,
        })),
      });
    }

    req.body = result.data;
    next();
  }) as RequestHandler;
}