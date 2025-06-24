import bcrypt from "bcrypt";
import { Usuario } from "../models/Usuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { generateToken } from "../utils/jwt";

export class UsuarioService {
  static async login(email: string, pass: string) {
    const usuario = await UsuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(pass, usuario.senha_hash);
    if (!senhaValida) {
      throw new Error("Senha inválida");
    }

    const token = generateToken({ id: usuario.id, email: usuario.email });
    return token;
  }
  static async getAll(): Promise<Usuario[]> {
    return UsuarioRepository.findAll();
  }

  static async create(
    data: Omit<Usuario, "id" | "data_criacao"> & { senha: string }
  ): Promise<Usuario> {
    const existing = await UsuarioRepository.findByEmail(data.email);
    if (existing) throw new Error("Email já cadastrado");

    // Hash da senha com bcrypt
    const senha_hash = await bcrypt.hash(data.senha, 10);

    const usuarioData = {
      nome_completo: data.nome_completo,
      email: data.email,
      senha_hash,
      telefone_contato: data.telefone_contato,
      tipo_usuario: data.tipo_usuario,
    };

    return UsuarioRepository.create(usuarioData);
  }
}
