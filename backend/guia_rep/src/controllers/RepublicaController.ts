import { Request, Response } from "express";
import { RepublicaService } from "../services/RepublicaService";

export class RepublicaController {
  static async encontrarTodasReps(req: Request, res: Response) {
    try {
      const reps = await RepublicaService.encontrarTodasReps();
      res.json(reps);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async cadastrarRep(req: Request, res: Response): Promise<void> {
    try {
      const rep = await RepublicaService.cadastrarRep(req.body);
      res.status(201).json(rep);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }
}
