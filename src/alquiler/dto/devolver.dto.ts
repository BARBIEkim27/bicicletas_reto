import { IsInt, IsNotEmpty } from 'class-validator';

export class DevolverDto {
  @IsInt()
  alquilerId: number;

  @IsNotEmpty()
  fechaFin: string; // 'YYYY-MM-DD'
}
