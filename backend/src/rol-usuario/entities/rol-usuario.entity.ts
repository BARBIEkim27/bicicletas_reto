import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('rol_usuario')
export class RolUsuario {
  @PrimaryGeneratedColumn()
  id_rol_usuario: number;

  @Column()
  usuario: string;

  @Column()
  administrador: string;

  @OneToMany(() => Usuario, u => u.fk_id_rol_usuario)
  usuarios: Usuario[];
}
