import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recorrido } from './entities/recorrido.entity';
import { CreateRecorridoDto } from './dto/create-recorrido.dto';
import { Bicicleta } from '../bicicleta/entities/bicicleta.entity';

@Injectable()
export class RecorridoService {
  constructor(
    @InjectRepository(Recorrido) private recorridoRepo: Repository<Recorrido>,
    @InjectRepository(Bicicleta) private biciRepo: Repository<Bicicleta>,
  ) {}

  async create(dto: CreateRecorridoDto) {
    const bicicleta = await this.biciRepo.findOne({ where: { id_bicicleta: dto.id_bicicleta } });
    if (!bicicleta) throw new Error('Bicicleta no encontrada');

    const nuevo = this.recorridoRepo.create({
      bicicleta,
      lat: dto.lat,
      lng: dto.lng,
    });
    return this.recorridoRepo.save(nuevo);
  }

  async findByBicicleta(id: number) {
    return this.recorridoRepo.find({
      where: { bicicleta: { id_bicicleta: id } },
      order: { fecha: 'ASC' },
    });
  }
}
