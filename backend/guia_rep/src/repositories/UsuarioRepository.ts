import { pool } from "../config/database";
import { Usuario, UsuarioSeguro } from "../models/Usuario";

export class UsuarioRepository {
  static async encontrarTodosUsuarioNoBD(): Promise<UsuarioSeguro[]> {
    try {
      const res = await pool.query(
        "SELECT id, nome_completo, email, telefone_contato, tipo_usuario, data_criacao FROM usuarios"
      );
      return res.rows;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw new Error("Erro ao buscar usuários");
    }
  }

  static async encontrarUsuarioPorIdNoBD(id: number): Promise<UsuarioSeguro[]> {
    try {
      const res = await pool.query(
        "SELECT id, nome_completo, email, telefone_contato, tipo_usuario, data_criacao FROM usuarios WHERE id =$1 ",
        [id]
      );
      return res.rows;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw new Error("Erro ao buscar usuário");
    }
  }

  static async encontrarPorEmailNoBD(email: string): Promise<Usuario | null> {
    try {
      const res = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
        email,
      ]);
      return res.rows[0] || null;
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      throw new Error("Erro ao buscar usuário");
    }
  }

  static async cadastrarUsuarioNoBD(
    data: Omit<Usuario, "id" | "data_criacao">
  ): Promise<Usuario> {
    const query = `
      INSERT INTO usuarios 
        (nome_completo, email, senha_hash, telefone_contato, tipo_usuario)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      data.nome_completo,
      data.email,
      data.senha_hash,
      data.telefone_contato,
      data.tipo_usuario,
    ];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw new Error("Erro ao criar usuário");
    }
  }
}
