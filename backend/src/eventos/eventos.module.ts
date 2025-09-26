import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Inscripcion, Usuario])],
  providers: [EventosService],
  controllers: [EventosController],
})
export class EventosModule {}
