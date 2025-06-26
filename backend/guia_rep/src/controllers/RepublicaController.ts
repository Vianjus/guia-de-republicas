import { Request, Response } from "express";
import { RepublicaService } from "../services/RepublicaService";

export class RepublicaController {
  static async getAll(req: Request, res: Response) {
    try {
      const reps = await RepublicaService.getAll();
      res.json(reps);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const rep = await RepublicaService.create(req.body);
      res.status(201).json(rep);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }
}
