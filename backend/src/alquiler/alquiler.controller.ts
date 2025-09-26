import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AlquilerService } from './alquiler.service';
import { AlquilarDto } from './dto/alquilar.dto';
import { DevolverDto } from './dto/devolver.dto';

@Controller('alquileres')
export class AlquilerController {
  constructor(private readonly svc: AlquilerService) {}

  @Post('alquilar')
  alquilar(@Body() dto: AlquilarDto) {
    return this.svc.alquilar(dto.usuarioId, dto.biciId, dto.fechaInicio);
  }

  @Post('devolver')
  devolver(@Body() dto: DevolverDto) {
    return this.svc.devolver(dto.alquilerId, dto.fechaFin);
  }

  @Get('ganancias')
  ganancias(@Query('year') year: string, @Query('month') month: string) {
    return this.svc.calcularGananciasNetasMensuales(Number(year), Number(month));
  }
}
