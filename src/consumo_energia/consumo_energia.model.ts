import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConsumoEnergiaDocument = ConsumoEnergia & Document;

@Schema()
export class ConsumoEnergia {
  @Prop({ required: true })
  unidadeConsumidora: string;

  @Prop({ required: true })
  leituraAnterior: number;

  @Prop({ required: true })
  leituraAtual: number;

  @Prop({ required: true })
  mesReferencia: string;
}

export const ConsumoEnergiaSchema = SchemaFactory.createForClass(ConsumoEnergia);