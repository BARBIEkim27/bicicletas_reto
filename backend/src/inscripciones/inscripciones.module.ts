import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion])],
  exports: [TypeOrmModule],
})
export class InscripcionesModule {}
