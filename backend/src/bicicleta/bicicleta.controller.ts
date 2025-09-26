import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { BicicletaService } from './bicicleta.service';
import { CreateBicicletaDto } from './dto/create-bicicleta.dto';

@Controller('bicicleta')
export class BicicletaController {
  constructor(private readonly svc: BicicletaService) {}

  @Post()
  create(@Body() dto: CreateBicicletaDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get('map')
  map() {
    return this.svc.findMap();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.svc.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<any>) {
    return this.svc.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.svc.remove(Number(id));
  }
}
