import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateEventoDto {
  @IsNotEmpty()
  nombre_evento: string;

  @IsNotEmpty()
  fecha_evento: string;

  descripcion?: string;

  @IsInt()
  cupos_disponibles: number;
}
