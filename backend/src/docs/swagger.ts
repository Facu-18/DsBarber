import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DsBarber API',
      version: '1.0.0',
      description: 'API para gestión de barberos y turnos',
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // ← donde están las anotaciones
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
