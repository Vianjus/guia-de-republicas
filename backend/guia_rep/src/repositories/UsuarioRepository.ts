import { pool } from "../config/database";
import { Usuario } from "../models/Usuario";

export class UsuarioRepository {
  static async findAll(): Promise<Usuario[]> {
    const res = await pool.query("SELECT * FROM usuarios ORDER BY id");
    return res.rows;
  }

  static async findByEmail(email: string): Promise<Usuario | null> {
    const res = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    return res.rows[0] || null;
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
    const res = await pool.query(query, values);
    return res.rows[0];
  }

  // Adicione outros métodos conforme necessidade (update, delete, findById, etc)
}
