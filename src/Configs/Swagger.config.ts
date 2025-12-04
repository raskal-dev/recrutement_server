import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for the API',
    },
  },
  apis: ['./src/Routes/*.ts'], // les fichiers de routes à analyser
};

export default swaggerOptions;