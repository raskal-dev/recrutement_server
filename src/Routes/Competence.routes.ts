import express from 'express';
import { getCompetencesController } from '../Controllers/Competence.controller';
import { jwtMiddleware } from '../Middlewares/jwtMiddleware';
import { Role } from '../Utils/Enums/Role.enum';

const competenceRouter = express.Router();
const role = [Role.STUDENT];

/**
 * @swagger
 * /competences:
 *   get:
 *     summary: Récupère la liste de toutes les compétences disponibles
 *     tags: [Competences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des compétences récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                         example: "React"
 */
competenceRouter.get('/', jwtMiddleware(role), getCompetencesController);

export default competenceRouter;