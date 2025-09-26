import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Alquiler } from '../../alquiler/entities/alquiler.entity';

@Entity('bicicleta')
export class Bicicleta {
  @PrimaryGeneratedColumn({ name: 'id_bicicleta' })
  id_bicicleta: number;

  @Column({ name: 'marca', length: 50 })
  marca: string;

  @Column({ name: 'color', length: 30 })
  color: string;

  @Column({ name: 'estado', length: 30 })
  estado: string;

  @Column('float', { name: 'precio_alquiler' })
  precio_alquiler: number;

  @Column({ name: 'disponible', default: true })
  disponible: boolean;

  @Column('decimal', { name: 'lat', precision: 10, scale: 7, nullable: true })
  lat: number;

  @Column('decimal', { name: 'lng', precision: 10, scale: 7, nullable: true })
  lng: number;

  @OneToMany(() => Alquiler, a => a.fk_id_bicicleta)
  alquileres: Alquiler[];
}
