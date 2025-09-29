import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RecorridoService } from './recorrido.service';
import { CreateRecorridoDto } from './dto/create-recorrido.dto';

@Controller('recorrido')
export class RecorridoController {
  constructor(private readonly svc: RecorridoService) {}

  @Post()
  create(@Body() dto: CreateRecorridoDto) {
    return this.svc.create(dto);
  }

  @Get(':idBicicleta')
  getRecorridos(@Param('idBicicleta') id: number) {
    return this.svc.findByBicicleta(Number(id));
  }
}
