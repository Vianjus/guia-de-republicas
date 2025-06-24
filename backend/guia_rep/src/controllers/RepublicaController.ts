import { Request, Response } from "express";
import { RepublicaService } from "../services/RepublicaService";

//alterando nome errado co commit

export class RepublicaController {
  static async getAll(req: Request, res: Response) {
    try {
      const reps = await RepublicaService.getAll();
      res.json(reps);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /*static async create(req: Request, res: Response) {
    try {
      const usuario = await UsuarioService.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }*/
}
