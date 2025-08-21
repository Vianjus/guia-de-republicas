import { pool } from "../config/database";
import { Republica } from "../models/Republica";

export class RepublicaRepository {
  static async encontrarTodasRepsNoBD(): Promise<Republica[]> {
    try {
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
    } catch (error) {
      console.error("Erro ao buscar todas as repúblicas:", error);
      throw new Error("Erro ao buscar repúblicas");
    }
  }

  static async encontrarPorNomeTipo(
    nome: string,
    tipo: string
  ): Promise<boolean> {
    try {
      const res = await pool.query(
        "SELECT * FROM republicas WHERE nome = $1 AND tipo = $2",
        [nome, tipo]
      );
      return res.rowCount! > 0;
    } catch (error) {
      console.error("Erro ao buscar república por nome e tipo:", error);
      throw new Error("Erro ao buscar república");
    }
  }

  static async cadastrarRepNoBD(
    data: Omit<Republica, "id" | "data_criacao" | "data_atualizacao">
  ): Promise<Republica> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // 2) Insere a república
      const insertRepublicaQuery = `
        INSERT INTO republicas (
          nome, descricao, endereco_completo, tipo, preco_medio_mensal,
          vagas_disponiveis, ativa, id_usuario_responsavel
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `;

      const republicaValues = [
        data.nome,
        data.descricao,
        data.endereco_completo,
        data.tipo,
        data.preco_media_mensal,
        data.vagas_disponiveis,
        data.ativa,
        data.id_responsavel,
      ];

      const { rows } = await client.query(
        insertRepublicaQuery,
        republicaValues
      );
      const republica = rows[0];
      if (!republica) {
        throw new Error("Falha ao inserir república.");
      }

      // 3) Insere as fotos, se houver
      if (data.fotos && data.fotos.length > 0) {
        for (const foto of data.fotos) {
          try {
            await client.query(
              `INSERT INTO fotos_republica (url_imagem, descricao_alt, id_republica)
               VALUES ($1, $2, $3);`,
              [foto.url_imagem, foto.descricao_alt || null, republica.id]
            );
          } catch (fotoErr) {
            console.warn("Erro ao inserir uma das fotos:", fotoErr);
            throw new Error("Erro ao salvar uma das fotos da república");
          }
        }
      }

      await client.query("COMMIT");
      return republica;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Erro ao criar república:", error);
      throw new Error(`Erro ao criar república: ${(error as Error).message}`);
    } finally {
      client.release();
    }
  }

  static async isResponsavelDeOutraRepublica(
    usuarioId: number
  ): Promise<boolean> {
    try {
      const res = await pool.query(
        "SELECT 1 FROM republicas WHERE id_usuario_responsavel = $1 LIMIT 1",
        [usuarioId]
      );
      return (res.rowCount ?? 0) > 0;
    } catch (error) {
      console.error("Erro ao verificar responsável:", error);
      throw new Error("Erro ao verificar responsável");
    }
  }

  static async encontrarPorIdNoBD(id: number): Promise<Republica | null> {
    try {
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
        WHERE r.id = $1
        GROUP BY r.id
      `, [id]);
      return res.rows[0] || null; // Retorna a primeira linha ou null se não encontrar
    } catch (error) {
      console.error(`Erro ao buscar república com ID ${id}:`, error);
      throw new Error("Erro ao buscar república por ID");
    }
  }

  static async deletarRepNoBD(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Primeiro, deleta as fotos associadas à república para evitar erros de chave estrangeira
      await client.query("DELETE FROM fotos_republica WHERE id_republica = $1", [id]);

      // Depois, deleta a república
      const res = await client.query("DELETE FROM republicas WHERE id = $1", [id]);

      await client.query("COMMIT");
      return res.rowCount! > 0; // Retorna true se alguma linha foi deletada
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(`Erro ao deletar república com ID ${id}:`, error);
      throw new Error(`Erro ao deletar república: ${(error as Error).message}`);
    } finally {
      client.release();
    }
  }

  static async contarRepublicasPorIdResponsavel(id: number): Promise<number> {
    try {
      const res = await pool.query(
        "SELECT COUNT(*) FROM republicas WHERE id_usuario_responsavel = $1",
        [id]
      );
      return parseInt(res.rows[0].count, 10);
    } catch (error) {
      console.error("Erro ao contar repúblicas por ID:", error);
      throw new Error("Erro ao verificar repúblicas do usuário");
    }
  }
}


