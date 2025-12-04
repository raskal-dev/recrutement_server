import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Recrutement',
      version: '1.0.0',
      description: 'Documentation complète de l\'API pour la plateforme de recrutement',
      contact: {
        name: 'Support API',
        email: 'support@recrutement.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Serveur de développement',
      },
      {
        url: 'https://api.recrutement.com/api',
        description: 'Serveur de production',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Entrez votre token JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID unique de l\'utilisateur',
            },
            name: {
              type: 'string',
              description: 'Nom complet de l\'utilisateur',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email de l\'utilisateur',
            },
            role: {
              type: 'string',
              enum: ['student', 'entreprise', 'admin'],
              description: 'Rôle de l\'utilisateur',
            },
            about: {
              type: 'string',
              description: 'Description de l\'utilisateur',
            },
            adress: {
              type: 'string',
              description: 'Adresse de l\'utilisateur',
            },
          },
        },
        Offer: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            title: {
              type: 'string',
              description: 'Titre de l\'offre',
            },
            description: {
              type: 'string',
              description: 'Description détaillée de l\'offre',
            },
            salary: {
              type: 'string',
              description: 'Salaire proposé',
            },
            localisation: {
              type: 'string',
              description: 'Localisation du poste',
            },
            contract: {
              type: 'string',
              description: 'Type de contrat',
            },
            UserId: {
              type: 'string',
              format: 'uuid',
              description: 'ID du recruteur',
            },
          },
        },
        Application: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            status: {
              type: 'string',
              enum: ['pending', 'reviewed', 'accepted', 'rejected'],
              description: 'Statut de la candidature',
            },
            coverLetter: {
              type: 'string',
              description: 'Lettre de motivation',
            },
            UserId: {
              type: 'string',
              format: 'uuid',
              description: 'ID du candidat',
            },
            OfferId: {
              type: 'string',
              format: 'uuid',
              description: 'ID de l\'offre',
            },
          },
        },
        Experience: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            title: {
              type: 'string',
              description: 'Titre du poste',
            },
            description: {
              type: 'string',
              description: 'Description de l\'expérience',
            },
            startDate: {
              type: 'string',
              format: 'date',
            },
            endDate: {
              type: 'string',
              format: 'date',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message d\'erreur',
            },
            statusCode: {
              type: 'number',
              description: 'Code de statut HTTP',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/Routes/*.ts', './src/Controllers/*.ts'], // les fichiers de routes et contrôleurs à analyser
};

export default swaggerOptions;