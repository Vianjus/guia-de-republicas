export type TipoUsuario = "estudante" | "morador";

export type UsuarioSeguro = Omit<Usuario, "senha_hash">;

export interface Usuario {
  id: number;
  nome_completo: string;
  email: string;
  senha_hash: string;
  telefone_contato: string;
  tipo_usuario: TipoUsuario;
  data_criacao: Date;
}
