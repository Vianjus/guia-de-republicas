import bcrypt from "bcrypt";
import { Usuario, UsuarioSeguro } from "../models/Usuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { RepublicaRepository } from "../repositories/RepublicaRepository";
import { generateToken } from "../utils/jwt";

export class UsuarioService {
  static async login(email: string, pass: string) {
    const usuario = await UsuarioRepository.encontrarPorEmailNoBD(email);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(pass, usuario.senha_hash);
    if (!senhaValida) {
      throw new Error("Senha inválida");
    }

    const token = generateToken({
      id: usuario.id,
      email: usuario.email,
      cargo: "normal",
    });
    return token;
  }
  static async retornarTodosUsuarios(): Promise<UsuarioSeguro[]> {
    return UsuarioRepository.encontrarTodosUsuarioNoBD();
  }

  static async retornarUsuarioPorId(id: number): Promise<UsuarioSeguro[]> {
    return UsuarioRepository.encontrarUsuarioPorIdNoBD(id);
  }

  static async cadastrarUsuario(
    data: Omit<Usuario, "id" | "data_criacao"> & { senha: string }
  ): Promise<Usuario> {
    const existing = await UsuarioRepository.encontrarPorEmailNoBD(data.email);
    if (existing) throw new Error("Email já cadastrado");

    const senha_hash = await bcrypt.hash(data.senha, 10);

    const { senha, ...resto } = data;
    const usuarioData = {
      ...resto,
      senha_hash,
    };

    // Aqui você pode salvar no banco, por exemplo:

    return await UsuarioRepository.cadastrarUsuarioNoBD(usuarioData);
  }

  static async deletarUsuarioPorEmail(email: string): Promise<void> {
    // 1. Primeiro, encontramos o usuário para obter seu ID e verificar se ele existe.
    const usuario = await UsuarioRepository.encontrarPorEmailNoBD(email);

    // Se o usuário não for encontrado, já podemos parar aqui.
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // 2. Com o ID do usuário em mãos, verificamos as repúblicas.
    const totalRepublicas = await RepublicaRepository.contarRepublicasPorIdResponsavel(usuario.id);

    if (totalRepublicas > 0) {
      throw new Error("Este usuário não pode ser deletado pois é responsável por uma república.");
    }

    // 3. Se todas as verificações passaram, deletamos o usuário.
    // O método de deleção já existia e usava o email, então podemos reutilizá-lo.
    await UsuarioRepository.deletarUsuarioPorEmailNoBD(email);
  }
}
