import { pool } from "../config/database";
import { Usuario } from "../models/Usuario";

export class UsuarioRepository {
  static async findAll(): Promise<Usuario[]> {
    try {
      const res = await pool.query("SELECT * FROM usuarios ORDER BY id");
      return res.rows;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw new Error("Erro ao buscar usuários");
    }
  }

  static async findByEmail(email: string): Promise<Usuario | null> {
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

  static async create(
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
      data.telefone_contato || null,
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
