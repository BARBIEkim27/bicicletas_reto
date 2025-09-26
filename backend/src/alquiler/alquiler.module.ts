import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alquiler } from './entities/alquiler.entity';
import { AlquilerService } from './alquiler.service';
import { AlquilerController } from './alquiler.controller';
import { Bicicleta } from '../bicicleta/entities/bicicleta.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alquiler, Bicicleta, Usuario])],
  providers: [AlquilerService],
  controllers: [AlquilerController],
  exports: [AlquilerService],
})
export class AlquilerModule {}
