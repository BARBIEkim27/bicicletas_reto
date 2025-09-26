import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';

@Controller('eventos')
export class EventosController {
  constructor(private readonly svc: EventosService) {}

  @Post()
  create(@Body() dto: CreateEventoDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Post(':id/inscribir')
  inscribir(@Param('id') id: number, @Body() body: { usuarioId: number }) {
    return this.svc.inscribirUsuario(body.usuarioId, Number(id));
  }
}
