import { z } from "zod";

export const cadastroUsuarioSchema = z.object({
  nome_completo: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(20, "Nome deve ter no máximo 20 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  tipo_usuario: z.enum(['morador', 'estudante']),
  telefone_contato: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato de telefone inválido (ex: (11) 98765-4321)"),
});