export type TipoUsuario = "estudante" | "morador";

export interface Usuario {
  id: number;
  nome_completo: string;
  email: string;
  senha_hash: string;
  telefone_contato?: string | null;
  tipo_usuario: TipoUsuario;
  data_criacao: Date;
}
