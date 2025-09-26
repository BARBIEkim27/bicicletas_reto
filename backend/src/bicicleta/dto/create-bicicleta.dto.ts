import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateBicicletaDto {
  @IsNotEmpty()
  marca: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  estado: string;

  @IsNumber()
  precio_alquiler: number;

  @IsOptional()
  lat?: number;

  @IsOptional()
  lng?: number;
}
