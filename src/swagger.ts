import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth api',
      version: '0.0.1',
      description: 'Api de autenticação de usuários',
      contact: {
        name: 'Hebert Conceição dos Santos',
        email: 'hebertsantosdeveloper@gmail.com',
        website: 'https://www.hebertzin.com/',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;
