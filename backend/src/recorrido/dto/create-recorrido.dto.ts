import { IsNumber } from 'class-validator';

export class CreateRecorridoDto {
  @IsNumber()
  id_bicicleta: number;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
