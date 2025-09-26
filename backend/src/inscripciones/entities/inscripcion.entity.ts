import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Evento } from '../../eventos/entities/evento.entity';

@Entity('inscripciones')
export class Inscripcion {
  @PrimaryGeneratedColumn()
  id_inscripcion: number;

  @Column({ type: 'date' })
  fecha_inscripcion: string;

  @ManyToOne(() => Usuario, u => u.inscripciones, { eager: true })
  @JoinColumn({ name: 'fk_id_usuario' })
  fk_id_usuario: Usuario;

  @ManyToOne(() => Evento, e => e.inscripciones, { eager: true })
  @JoinColumn({ name: 'fk_id_evento' })
  fk_id_evento: Evento;
}
