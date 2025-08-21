import { Usuario, UsuarioSeguro } from "../models/Usuario";

export function sanitizeUsuario(usuario: Usuario): UsuarioSeguro {
  const { senha_hash, ...resto } = usuario;
  return resto;
}
