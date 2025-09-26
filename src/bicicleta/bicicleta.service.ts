import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bicicleta } from './entities/bicicleta.entity';

@Injectable()
export class BicicletaService {
  constructor(@InjectRepository(Bicicleta) private repo: Repository<Bicicleta>) {}

  create(data: Partial<Bicicleta>) {
    const b = this.repo.create(data);
    return this.repo.save(b);
  }

  findAll() {
    return this.repo.find();
  }

  findMap() {
    return this.repo.find({ select: ['id_bicicleta', 'marca', 'color', 'estado', 'precio_alquiler'], });
  }

  async findOne(id: number) {
    const b = await this.repo.findOneBy({ id_bicicleta: id });
    console.log(b);
    if (!b) throw new NotFoundException('Bicicleta no encontrada');
    return b;
  }

  async update(id: number, partial: Partial<Bicicleta>) {
    await this.repo.update(id, partial);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
