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

  static async retornarTodosUsuarios(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const usuarios = await UsuarioService.retornarTodosUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async retornarUsuarioPorId(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const numId = parseInt(id);

    try {
      const usuario = await UsuarioService.retornarUsuarioPorId(numId);
      if (!usuario) {
        res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
  }

  static async cadastrarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuario = await UsuarioService.cadastrarUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async deletarUsuario(req: Request, res: Response): Promise<void> {
    const { email } = req.params;

    try {
      await UsuarioService.deletarUsuarioPorEmail(email);
      res.status(204).send();
    } catch (error) {
      const err = error as Error;

      if (err.message.includes("responsável por uma república")) {
        res.status(409).json({ error: err.message }); // 409 Conflict
      } 
      else if (err.message === "Usuário não encontrado") {
        res.status(404).json({ error: err.message });
      } 
      else {
        res.status(500).json({ error: "Erro interno ao deletar usuário" });
      }
    }
  }
}
