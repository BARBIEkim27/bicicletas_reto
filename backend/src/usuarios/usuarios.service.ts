import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { RolUsuario } from '../rol-usuario/entities/rol-usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private repo: Repository<Usuario>,
    @InjectRepository(RolUsuario) private rolRepo: Repository<RolUsuario>,
  ) {}

  async create(dto: CreateUsuarioDto) {
    const rol = await this.rolRepo.findOneBy({ id_rol_usuario: dto.fk_id_rol_usuario });
    if (!rol) throw new NotFoundException('Rol no existe');
    const u = this.repo.create({ nombre: dto.nombre, estrato_socioeconomico: dto.estrato_socioeconomico, fk_id_rol_usuario: rol });
    return this.repo.save(u);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const u = await this.repo.findOneBy({ id_usuario: id });
    if (!u) throw new NotFoundException('Usuario no encontrado');
    return u;
  }

  async update(id: number, partial: Partial<Usuario>) {
    await this.repo.update(id, partial);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
