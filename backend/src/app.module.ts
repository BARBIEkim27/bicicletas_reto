import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecorridoModule } from './recorrido/recorrido.module';

import { RolUsuarioModule } from './rol-usuario/rol-usuario.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { BicicletaModule } from './bicicleta/bicicleta.module';
import { AlquilerModule } from './alquiler/alquiler.module';
import { EventosModule } from './eventos/eventos.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')) || 3306,
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false
      }),
    }),
    RolUsuarioModule,
    UsuariosModule,
    BicicletaModule,
    AlquilerModule,
    EventosModule,
    InscripcionesModule,
    RecorridoModule   
  ],
})
export class AppModule {}
