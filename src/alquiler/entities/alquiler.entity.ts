import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Bicicleta } from '../../bicicleta/entities/bicicleta.entity';

@Entity('alquiler')
export class Alquiler {
  @PrimaryGeneratedColumn()
  id_alquiler: number;

  @Column({ type: 'date' })
  fecha_inicio: string;

  @Column({ type: 'date', nullable: true })
  fecha_fin: string | null;

  @Column('decimal', { precision: 10, scale: 2 })
  tarifa_base: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  descuento_aplicado: number;

  @ManyToOne(() => Usuario, u => u.alquileres, { eager: true })
  @JoinColumn({ name: 'fk_id_usuario' })
  fk_id_usuario: Usuario;

  @ManyToOne(() => Bicicleta, b => b.alquileres, { eager: true })
  @JoinColumn({ name: 'fk_id_bicicleta' })
  fk_id_bicicleta: Bicicleta;
}
