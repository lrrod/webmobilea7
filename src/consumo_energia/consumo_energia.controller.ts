import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ConsumoEnergiaService } from './consumo_energia.service';
import { ConsumoEnergia } from './consumo_energia.model';
import { Param } from '@nestjs/common';

@Controller('consumo_energia')
export class ConsumoEnergiaController {
  constructor(private readonly service: ConsumoEnergiaService) {}

  @Post()
  async registrar(@Body() dado: Omit<ConsumoEnergia, 'id'>) {
    return this.service.registrarConsumo(dado);
  }

  @Get('historico')
  async historico(@Query('unidade') unidade: string) {
    return this.service.consultarHistorico(unidade);
  }

  @Delete(':id')
  async deletarPorId(@Param('id') id: string) {
    return this.service.deletarPorId(id);
  }
}