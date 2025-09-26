import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Alquiler } from './entities/alquiler.entity';
import { Bicicleta } from '../bicicleta/entities/bicicleta.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AlquilerService {
  constructor(
    @InjectRepository(Alquiler) private alquilerRepo: Repository<Alquiler>,
    @InjectRepository(Bicicleta) private biciRepo: Repository<Bicicleta>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
  ) {}

  private descuentoPorEstrato(estrato: number): number {
    if (estrato <= 2) return 0.10;
    if (estrato <= 4) return 0.05;
    return 0;
  }

  async alquilar(usuarioId: number, biciId: number, fechaInicio: string) {
    const usuario = await this.usuarioRepo.findOneBy({ id_usuario: usuarioId });
    if (!usuario) throw new BadRequestException('Usuario no existe');

    // Verifica si el usuario ya tiene un alquiler activo
    const alquilerActivo = await this.alquilerRepo.findOne({
      where: {
        fk_id_usuario: { id_usuario: usuarioId },
        fecha_fin: null,
      },
    });

    if (alquilerActivo) {
      throw new BadRequestException('El usuario ya tiene un alquiler activo');
    }

    // Buscar bicicleta
    const bici = await this.biciRepo.findOneBy({ id_bicicleta: biciId });
    if (!bici) throw new BadRequestException('Bicicleta no existe');
    
    // Verificar disponibilidad (asegúrate de que en BD esté en true)
    if (!bici.disponible) throw new BadRequestException('Bicicleta no disponible');

    const tarifaBase = Number(bici.precio_alquiler);

    // Marcar como no disponible
    bici.disponible = false;
    await this.biciRepo.save(bici);

    const alquiler = this.alquilerRepo.create({
      fecha_inicio: fechaInicio,
      tarifa_base: tarifaBase,
      descuento_aplicado: 0,
      fk_id_usuario: usuario,
      fk_id_bicicleta: bici,
    });

    return this.alquilerRepo.save(alquiler);
  }

  async devolver(alquilerId: number, fechaFin: string) {
    const alquiler = await this.alquilerRepo.findOne({
      where: { id_alquiler: alquilerId },
      relations: ['fk_id_usuario', 'fk_id_bicicleta'],
    });

    if (!alquiler) throw new BadRequestException('Alquiler no encontrado');
    if (alquiler.fecha_fin) throw new BadRequestException('Alquiler ya finalizado');

    const inicio = new Date(alquiler.fecha_inicio);
    const fin = new Date(fechaFin);
    let dias = Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
    if (dias <= 0) dias = 1;

    const montoInicial = Number(alquiler.tarifa_base) * dias;
    const estrato = alquiler.fk_id_usuario.estrato_socioeconomico;
    const descuentoRatio = this.descuentoPorEstrato(estrato);
    const descuento = montoInicial * descuentoRatio;
    const total = montoInicial - descuento;

    alquiler.fecha_fin = fechaFin;
    alquiler.descuento_aplicado = Number(descuento.toFixed(2));
    await this.alquilerRepo.save(alquiler);

    const bici = await this.biciRepo.findOneBy({
      id_bicicleta: alquiler.fk_id_bicicleta.id_bicicleta,
    });

    if (bici) {
      bici.disponible = true;
      await this.biciRepo.save(bici);
    }

    return {
      montoInicial: Number(montoInicial.toFixed(2)),
      descuento: Number(descuento.toFixed(2)),
      total: Number(total.toFixed(2)),
      dias,
    };
  }

  async calcularGananciasNetasMensuales(year: number, month: number) {
    const desde = new Date(year, month - 1, 1);
    const hasta = new Date(year, month, 0);

    const desdeStr = desde.toISOString().split('T')[0];
    const hastaStr = hasta.toISOString().split('T')[0];

    const alquileres = await this.alquilerRepo.find({
      where: { fecha_fin: Between(desdeStr, hastaStr) },
      relations: ['fk_id_usuario', 'fk_id_bicicleta'],
    });

    let totalIngresos = 0;
    let totalDescuentos = 0;

    for (const a of alquileres) {
      const inicio = new Date(a.fecha_inicio);
      const fin = new Date(a.fecha_fin);
      let dias = Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
      if (dias <= 0) dias = 1;

      const montoInicial = Number(a.tarifa_base) * dias;
      const descuento =
        Number(a.descuento_aplicado) ||
        montoInicial * this.descuentoPorEstrato(a.fk_id_usuario.estrato_socioeconomico);

      totalIngresos += montoInicial;
      totalDescuentos += descuento;
    }

    const neto = totalIngresos - totalDescuentos;
    return {
      totalIngresos: Number(totalIngresos.toFixed(2)),
      totalDescuentos: Number(totalDescuentos.toFixed(2)),
      neto: Number(neto.toFixed(2)),
    };
  }
}
