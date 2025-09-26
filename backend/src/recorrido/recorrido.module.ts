import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recorrido } from './entities/recorrido.entity';
import { RecorridoService } from './recorrido.service';
import { RecorridoController } from './recorrido.controller';
import { Bicicleta } from '../bicicleta/entities/bicicleta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recorrido, Bicicleta])],
  controllers: [RecorridoController],
  providers: [RecorridoService],
})
export class RecorridoModule {}
