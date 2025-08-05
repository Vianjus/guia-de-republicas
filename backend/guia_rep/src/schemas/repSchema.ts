import { z } from "zod";

const fotoSchema = z.object({
  url_imagem: z.string().url("A URL da imagem deve ser um formato válido"),
  descricao_alt: z.string().min(5, "A descrição da imagem deve ter pelo menos 5 caracteres"),
});

export const cadastroRepublicaSchema = z.object({
  email_responsavel: z.string().email("Email do responsável inválido"),
  nome: z.string().min(5, "O nome da república deve ter pelo menos 5 caracteres"),
  descricao: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
  endereco_completo: z.string().min(15, "O endereço completo deve ter mais de 15 caracteres"),
  tipo: z.enum(["mista", "masculina", "feminina"], "O tipo deve ser 'mista', 'masculina' ou 'feminina'"),
  preco_media_mensal: z.number().positive("O preço médio mensal deve ser um número positivo"),
  vagas_disponiveis: z.number().int().min(1, "A república deve ter pelo menos 1 vaga disponível"),
  ativa: z.boolean(),
  fotos: z.array(fotoSchema).min(1, "É necessário adicionar pelo menos uma foto para a república"),
});