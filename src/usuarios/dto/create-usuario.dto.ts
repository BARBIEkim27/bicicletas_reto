import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @Min(1)
  @Max(6)
  estrato_socioeconomico: number;

  @IsInt()
  fk_id_rol_usuario: number;
}
