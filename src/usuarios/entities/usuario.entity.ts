import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { RolUsuario } from '../../rol-usuario/entities/rol-usuario.entity';
import { Alquiler } from '../../alquiler/entities/alquiler.entity';
import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre: string;

  @Column()
  estrato_socioeconomico: number;

  @ManyToOne(() => RolUsuario, r => r.usuarios, { eager: true })
  @JoinColumn({ name: 'fk_id_rol_usuario' })
  fk_id_rol_usuario: RolUsuario;

  @OneToMany(() => Alquiler, a => a.fk_id_usuario)
  alquileres: Alquiler[];

  @OneToMany(() => Inscripcion, i => i.fk_id_usuario)
  inscripciones: Inscripcion[];
}
