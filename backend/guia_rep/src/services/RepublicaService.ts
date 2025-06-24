import { Republica } from "../models/Republica";
import { RepublicaRepository } from "../repositories/RepublicaRepository";

export class RepublicaService {
  static async getAll(): Promise<Republica[]> {
    return RepublicaRepository.findAll();
  }
}
