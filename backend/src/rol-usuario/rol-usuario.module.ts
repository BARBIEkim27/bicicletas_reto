import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolUsuario } from './entities/rol-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolUsuario])],
  exports: [TypeOrmModule],
})
export class RolUsuarioModule {}
