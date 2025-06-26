import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

export class UsuarioController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, senha } = req.body;

    try {
      const token = await UsuarioService.login(email, senha);
      res.json({ token });
    } catch (err) {
      res.status(401).json({ error: (err as Error).message });
    }
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await UsuarioService.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const usuario = await UsuarioService.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
