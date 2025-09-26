import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly svc: UsuariosService) {}

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
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
