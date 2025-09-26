import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bicicleta } from './entities/bicicleta.entity';
import { BicicletaService } from './bicicleta.service';
import { BicicletaController } from './bicicleta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bicicleta])],
  controllers: [BicicletaController],
  providers: [BicicletaService],
  exports: [BicicletaService],
})
export class BicicletaModule {}
