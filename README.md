# bicicletas_reto
el sena tiene 100 bicicletas pero no cuenta con un sistema que lo gestione por lo que genera que no se obtengan datos ni comprobantes
# SENA Bicicletas - Backend (NestJS)

Proyecto scaffold generado por ChatGPT. Usa .env para configuración de la base de datos.

## Requisitos
- Node.js >= 18
- MySQL (crear la base de datos `retobicicletas`)

## Instalación
```bash
npm install
# ajustar .env
npm run start:dev
```

Endpoints principales:
- POST /bicicletas
- GET /bicicletas
- GET /bicicletas/map
- POST /alquileres/alquilar
- POST /alquileres/devolver
- GET /alquileres/ganancias?year=YYYY&month=MM
- POST /eventos
- POST /eventos/:id/inscribir
