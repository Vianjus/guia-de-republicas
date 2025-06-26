import { UsuarioSeguro } from "./Usuario";

export enum TipoRepublica {
  MISTA = "mista",
  FEMININA = "feminina",
  MASCULINA = "masculina",
  // Add other possible enum values if needed
}

// Main Republica model interface
export interface FotoRepublica {
  id: number;
  url_imagem: string;
  descricao_alt: string;
}

export interface Republica {
  id: string; // UUID
  responsavel: UsuarioSeguro;
  nome: string;
  descricao: string;
  endereco_completo: string;
  tipo: TipoRepublica; // Enum, exemplo: "mista", "feminina", etc.
  preco_media_mensal: number; // ex: 650.00
  vagas_disponiveis: number;
  telefone_rep: string;
  ativa: boolean;
  fotos: FotoRepublica[];
}
