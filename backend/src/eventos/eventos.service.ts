import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento) private eventoRepo: Repository<Evento>,
    @InjectRepository(Inscripcion) private inscRepo: Repository<Inscripcion>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
  ) {}

  create(dto: Partial<Evento>) {
    const e = this.eventoRepo.create(dto);
    return this.eventoRepo.save(e);
  }

  findAll() {
    return this.eventoRepo.find();
  }

  async inscribirUsuario(usuarioId: number, eventoId: number) {
    const evento = await this.eventoRepo.findOneBy({ id_evento: eventoId });
    if (!evento) throw new BadRequestException('Evento no existe');
    if (evento.cupos_disponibles <= 0) throw new BadRequestException('No hay cupos');
    const usuario = await this.usuarioRepo.findOneBy({ id_usuario: usuarioId });
    if (!usuario) throw new BadRequestException('Usuario no existe');

    const insc = this.inscRepo.create({
      fecha_inscripcion: new Date().toISOString().split('T')[0],
      fk_id_usuario: usuario,
      fk_id_evento: evento,
    });
    evento.cupos_disponibles -= 1;
    await this.eventoRepo.save(evento);
    return this.inscRepo.save(insc);
  }
}
