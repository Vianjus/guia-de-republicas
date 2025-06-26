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

    const senha_hash = await bcrypt.hash(data.senha, 10);
    const { senha, ...resto } = data;
    const usuarioData = {
      ...resto,
      senha_hash,
    };

    // Aqui você pode salvar no banco, por exemplo:
    return await UsuarioRepository.create(usuarioData);
  }
}
