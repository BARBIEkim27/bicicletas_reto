import { IsInt, IsString } from 'class-validator';

export class AlquilarDto {
  @IsInt()
  usuarioId: number;

  @IsInt()
  biciId: number;

  @IsString()
  fechaInicio: string;
}
