import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { mkdirSync } from 'fs';  
import { fileURLToPath } from 'url'; 
import { dirname, join } from 'path';  
 
// Models
import './src/models/index.js';
import { sequelize } from './src/config/database.js';
 
// Routes
import authRoutes from './src/routes/auth.js';
import eventRoutes from './src/routes/events.js';
import reservationRoutes from './src/routes/reservations.js';
import recommendationRoutes from './src/routes/recommendations.js';
import categorieRoutes from './src/routes/categorie.js';
import avisRoutes from './src/routes/avis.js';
import paiementRoutes from './src/routes/paiements.js';
 
// Middleware
import { errorHandler } from './src/middleware/errorHandler.js';
 
dotenv.config();
 
const app = express();
const PORT = process.env.PORT || 5000;
 
// CRÉATION DOSSIER UPLOADS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = join(__dirname, 'uploads');
mkdirSync(uploadDir, { recursive: true });
 
// ============================================
// CONFIGURATION SWAGGER
// ============================================
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🎪 Event Platform API',
      version: '1.0.0',
      description: 'Documentation de l\'API de la plateforme événementielle',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Serveur de développement',
      },
    ],
 
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
 
      schemas: {
        Event: {
          type: 'object',
          required: ['title', 'date'],
          properties: {
            id: { type: 'string', example: '1' },
            title: { type: 'string', example: 'Concert' },
            description: { type: 'string', example: 'Grand concert live' },
            date: { type: 'string', format: 'date-time' },
            location: { type: 'string', example: 'Antananarivo' },
            categoryId: { type: 'string', example: '2' }
          }
        },
 
        Category: {
          type: 'object',
          required: ['name'],
          properties: {
            id: { type: 'string', example: '2' },
            name: { type: 'string', example: 'Concert' },
            description: { type: 'string', example: 'Événements musicaux' }
          }
        },
 
        Reservation: {
          type: 'object',
          required: ['eventId'],
          properties: {
            id: { type: 'string', example: '10' },
            userId: { type: 'string', example: '5' },
            eventId: { type: 'string', example: '1' },
            seats: { type: 'number', example: 2 },
            status: { type: 'string', example: 'confirmed' }
          }
        },
 
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', example: 'admin' }
          }
        }
      }
    },
 
    security: [{ bearerAuth: [] }],
  },
 
  apis: ['./src/routes/*.js'],
};
 
const swaggerSpec = swaggerJsdoc(swaggerOptions);
 
// ============================================
// MIDDLEWARES GLOBAUX
// ============================================
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// ✅ SERVE FICHIERS STATIQUES — une seule fois, ici
app.use('/uploads', express.static(uploadDir));
 
// ============================================
// SWAGGER UI
// ============================================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Event Platform API Docs',
 
  swaggerOptions: {
    persistAuthorization: true,
 
    requestInterceptor: (req) => {
      const token = localStorage.getItem('token');
      if (token) {
        req.headers['Authorization'] = 'Bearer ' + token;
      }
      return req;
    },
 
    responseInterceptor: (res) => {
      if (res.url.includes('/api/auth/login') && res.status === 200) {
        try {
          const data = JSON.parse(res.text);
          if (data.token) {
            localStorage.setItem('token', data.token);
            console.log(' Token sauvegardé automatiquement !');
          }
        } catch (e) {
          console.error('Erreur parsing token');
        }
      }
      return res;
    }
  }
}));
 
// ============================================
// ROUTES
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/avis', avisRoutes);
app.use('/api/paiements', paiementRoutes);
 
// Route test
app.get('/', (req, res) => {
  res.json({
    message: '🎪 Event Platform API is running !',
    documentation: `http://localhost:${PORT}/api-docs`,
    uploads: `http://localhost:${PORT}/uploads/`,
    routes: [
      '/api/auth',
      '/api/events',
      '/api/reservations',
      '/api/recommendations',
      '/api/categories',
      '/api/avis',
      '/api/paiements'
    ]
  });
});
 
// ============================================
// GESTION ERREURS
// ============================================
app.use(errorHandler);
 
// ============================================
// DÉMARRAGE SERVEUR
// ============================================
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(' PostgreSQL connecté !');
 
    await sequelize.sync({ force: true });
    console.log(' Tables synchronisées !');
 
    // SEED DES RÔLES PAR DÉFAUT
    const Role = sequelize.models.Role;
    if (Role) {
      await Role.bulkCreate([
        { nom: 'user' },
        { nom: 'admin' },
        { nom: 'organisateur' }
      ], { ignoreDuplicates: true });
      console.log(' Rôles créés !');
    }
 
    app.listen(PORT, () => {
      console.log(` Serveur démarré sur http://localhost:${PORT}`);
      console.log(` Documentation Swagger : http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error(' Erreur connexion BDD :', error);
    process.exit(1);
  }
};
 
startServer();