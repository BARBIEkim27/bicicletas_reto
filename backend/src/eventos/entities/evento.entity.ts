import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity';

@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn()
  id_evento: number;

  @Column({ length: 100 })
  nombre_evento: string;

  @Column({ type: 'date' })
  fecha_evento: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column()
  cupos_disponibles: number;

  @OneToMany(() => Inscripcion, i => i.fk_id_evento)
  inscripciones: Inscripcion[];
}
