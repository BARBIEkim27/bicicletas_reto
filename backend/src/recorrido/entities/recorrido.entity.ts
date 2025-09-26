import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Bicicleta } from '../../bicicleta/entities/bicicleta.entity';

@Entity('recorrido')
export class Recorrido {
  @PrimaryGeneratedColumn({ name: 'id_recorrido' })
  id_recorrido: number;

  @ManyToOne(() => Bicicleta, b => b.alquileres)
  @JoinColumn({ name: 'id_bicicleta' })
  bicicleta: Bicicleta;

  @Column('decimal', { precision: 10, scale: 7 })
  lat: number;

  @Column('decimal', { precision: 10, scale: 7 })
  lng: number;

  @Column({ name: 'fecha', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
