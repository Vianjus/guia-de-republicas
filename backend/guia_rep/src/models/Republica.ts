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
  name: string;
  description: string;
  endereco_completo: string;
  tipo: TipoRepublica; // Enum, exemplo: "mista", "feminina", etc.
  preco_media_mensal: number; // ex: 650.00
  vagas_disponiveis: number;
  ativa: boolean;
  fotos: FotoRepublica[];
}
