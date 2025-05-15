import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConsumoEnergia,
  ConsumoEnergiaDocument,
} from './consumo_energia.model';
import { Model } from 'mongoose';

@Injectable()
export class ConsumoEnergiaService {
  constructor(
    @InjectModel(ConsumoEnergia.name)
    private readonly consumoModel: Model<ConsumoEnergiaDocument>,
  ) {}

  async registrarConsumo(dado: Omit<ConsumoEnergia, 'id'>) {
    const novoRegistro = new this.consumoModel(dado);
    await novoRegistro.save();

    const alerta = await this.verificarAlerta(
      dado.unidadeConsumidora,
      dado.mesReferencia,
    );
    const consumo = dado.leituraAtual - dado.leituraAnterior;

    return {
      mensagem: 'Registro salvo com sucesso.',
      consumoKwh: consumo,
      alerta,
    };
  }

  async consultarHistorico(unidade: string) {
    return this.consumoModel
      .find({ unidadeConsumidora: unidade })
      .sort({ mesReferencia: 1 });
  }

  async verificarAlerta(
    unidade: string,
    mesAtual: string,
  ): Promise<string | null> {
    const registros = await this.consumoModel
      .find({ unidadeConsumidora: unidade })
      .sort({ mesReferencia: -1 })
      .limit(2);

    if (registros.length < 2) return null;

    const [atual, anterior] = registros;

    const consumoAtual = atual.leituraAtual - atual.leituraAnterior;
    const consumoAnterior = anterior.leituraAtual - anterior.leituraAnterior;

    if (consumoAtual > consumoAnterior) {
      return `⚠️ Alerta: Consumo aumentou em ${
        consumoAtual - consumoAnterior
      } kWh em relação ao mês anterior (${anterior.mesReferencia}).`;
    }

    return null;
  }

  async deletarPorId(id: string) {
    const resultado = await this.consumoModel.findByIdAndDelete(id);
    if (!resultado) {
      throw new Error(`Registro com ID ${id} não encontrado.`);
    }
    return {
      mensagem: `Registro com ID ${id} deletado com sucesso.`,
      registro: resultado,
    };
    }
}