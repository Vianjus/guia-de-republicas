import { Republica } from "../models/Republica";
import { RepublicaRepository } from "../repositories/RepublicaRepository";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

type RepublicaEntrada = Omit<
  Republica,
  "id" | "data_criacao" | "data_atualizacao"
> & {
  email_responsavel: string;
};

export class RepublicaService {
  static async encontrarTodasReps(): Promise<Republica[]> {
    return RepublicaRepository.encontrarTodasRepsNoBD();
  }

  static async cadastrarRep(data: RepublicaEntrada): Promise<Republica> {
    // 1. Verifica se já existe república com mesmo nome e tipo

    const existing = await RepublicaRepository.encontrarPorNomeTipo(
      data.nome,
      data.tipo
    );
    if (existing) throw new Error("República já cadastrada");

    // 2. Busca o usuário responsável pelo e-mail
    const usuario = await UsuarioRepository.encontrarPorEmailNoBD(
      data.email_responsavel
    );
    if (!usuario) throw new Error("Responsável não encontrado");

    const jaResponsavel =
      await RepublicaRepository.isResponsavelDeOutraRepublica(usuario.id);
    if (jaResponsavel) {
      throw new Error("Usuário já é responsável por outra república");
    }

    // 3. Monta o objeto final para o repositório
    const { email_responsavel, ...resto } = data;

    const repData: Omit<Republica, "id" | "data_criacao" | "data_atualizacao"> =
      {
        ...resto,
        id_responsavel: usuario.id,
      };

    // 4. Chama o repository para inserir e retorna o resultado
    return RepublicaRepository.cadastrarRepNoBD(repData);
  }
}
