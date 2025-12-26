import express from "express";
import { Role } from "../Utils/Enums/Role.enum";
import { jwtMiddleware } from "../Middlewares/jwtMiddleware";
import { 
    createExperienceController, 
    getExperienceController, 
    getExperiencesController,
    getExperiencesByUserController,
    updateExperienceController,
    deleteExperienceController
} from "../Controllers/Experience.controller";

const experienceRouter = express.Router();
const roleStudent = [Role.STUDENT];
const roleEntreprise = [Role.ENTREPRISE];

/**
 * @swagger
 * /experiences:
 *   get:
 *     summary: Récupère toutes les expériences (ou celles de l'utilisateur connecté)
 *     tags: [Experiences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des expériences récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Experience'
 */
experienceRouter.get("/", jwtMiddleware([...roleStudent, ...roleEntreprise]), getExperiencesController);

/**
 * @swagger
 * /experiences/user/{userId}:
 *   get:
 *     summary: Récupère les expériences d'un utilisateur spécifique
 *     tags: [Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Liste des expériences récupérée avec succès
 */
experienceRouter.get("/user/:userId", jwtMiddleware([...roleStudent, ...roleEntreprise]), getExperiencesByUserController);

/**
 * @swagger
 * /experiences/{experienceId}:
 *   get:
 *     summary: Récupère une expérience spécifique
 *     tags: [Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: experienceId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Expérience récupérée avec succès
 *       404:
 *         description: Expérience non trouvée
 */
experienceRouter.get("/:experienceId", jwtMiddleware([...roleStudent, ...roleEntreprise]), getExperienceController);

/**
 * @swagger
 * /experiences:
 *   post:
 *     summary: Crée une nouvelle expérience professionnelle
 *     tags: [Experiences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - startDate
 *               - endDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Développeur Full Stack"
 *               description:
 *                 type: string
 *                 example: "Développement d'applications web avec React et Node.js"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2022-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-31"
 *     responses:
 *       201:
 *         description: Expérience créée avec succès
 *       400:
 *         description: Données invalides
 */
experienceRouter.post("/", jwtMiddleware(roleStudent), createExperienceController);

/**
 * @swagger
 * /experiences/{experienceId}:
 *   put:
 *     summary: Met à jour une expérience professionnelle
 *     tags: [Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: experienceId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Expérience mise à jour avec succès
 *       404:
 *         description: Expérience non trouvée
 */
experienceRouter.put("/:experienceId", jwtMiddleware(roleStudent), updateExperienceController);

/**
 * @swagger
 * /experiences/{experienceId}:
 *   delete:
 *     summary: Supprime une expérience professionnelle
 *     tags: [Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: experienceId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Expérience supprimée avec succès
 *       404:
 *         description: Expérience non trouvée
 */
experienceRouter.delete("/:experienceId", jwtMiddleware(roleStudent), deleteExperienceController);

export default experienceRouter;