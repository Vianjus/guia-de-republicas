import { pool } from "../config/database";
import { Republica } from "../models/Republica";
export class RepublicaRepository {
  static async findAll(): Promise<Republica[]> {
    const res = await pool.query(`
    SELECT 
      r.*, 
      COALESCE(json_agg(
        json_build_object(
          'id', f.id,
          'url_imagem', f.url_imagem,
          'descricao_alt', f.descricao_alt
        )
      ) FILTER (WHERE f.id IS NOT NULL), '[]') AS fotos
    FROM republicas r
    LEFT JOIN fotos_republica f ON f.id_republica = r.id
    GROUP BY r.id
    ORDER BY r.id
  `);
    return res.rows;
  }
}
