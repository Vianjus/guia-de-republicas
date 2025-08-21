import { Request, Response } from "express";
import { RepublicaService } from "../services/RepublicaService";

export class RepublicaController {
  static async encontrarTodasReps(req: Request, res: Response) {
    try {
      const reps = await RepublicaService.encontrarTodasReps();
      res.status(201).json(reps);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async retornarRepId(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const numId = parseInt(id);

    try {
      const rep = await RepublicaService.retornarRepPorId(numId);
      if (!rep) {
        res.status(404).json({ mensagem: "Republica não encontrado" });
      }
      res.status(200).json(rep);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
  }

  static async cadastrarRep(req: Request, res: Response): Promise<void> {
    try {
      console.log("aqyu");
      console.log(req.body);
      const rep = await RepublicaService.cadastrarRep(req.body);
      res.status(201).json(rep);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  static async deletarRep(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; // Pega o ID da URL
      const republicaId = parseInt(id, 10); // Converte para número

      if (isNaN(republicaId)) {
        res.status(400).json({ error: "ID da república inválido." });
        return;
      }

      await RepublicaService.deletarRep(republicaId);
      // Status 204 No Content é apropriado para deleções bem-sucedidas sem retorno de corpo
      res.status(204).send();
    } catch (error) {
      // Se a república não for encontrada, o service lança um erro
      if ((error as Error).message === "República não encontrada.") {
        res.status(404).json({ error: (error as Error).message });
      } else {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  }
}
