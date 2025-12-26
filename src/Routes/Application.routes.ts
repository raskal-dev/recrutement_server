import express from "express";
import {
    createApplicationController,
    getApplicationsByOfferController,
    getApplicationsByUserController,
    updateApplicationStatusController,
    getApplicationController,
    getAllApplicationsController,
} from "../Controllers/Application.controller";
import { jwtMiddleware } from "../Middlewares/jwtMiddleware";
import { Role } from "../Utils/Enums/Role.enum";

const applicationRouter = express.Router();
const roleStudent = [Role.STUDENT];
const roleEntreprise = [Role.ENTREPRISE];

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Crée une nouvelle candidature
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - OfferId
 *             properties:
 *               OfferId:
 *                 type: string
 *                 format: uuid
 *                 description: ID de l'offre
 *               coverLetter:
 *                 type: string
 *                 description: Lettre de motivation (optionnelle)
 *     responses:
 *       201:
 *         description: Candidature créée avec succès
 *       400:
 *         description: Données invalides ou candidature déjà existante
 *       404:
 *         description: Offre non trouvée
 */
applicationRouter.post("/", jwtMiddleware(roleStudent), createApplicationController);

/**
 * @swagger
 * /applications/offer/{offerId}:
 *   get:
 *     summary: Récupère toutes les candidatures pour une offre (recruteur)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Liste des candidatures récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 */
applicationRouter.get("/offer/:offerId", jwtMiddleware(roleEntreprise), getApplicationsByOfferController);

/**
 * @swagger
 * /applications/user:
 *   get:
 *     summary: Récupère toutes les candidatures de l'utilisateur connecté
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des candidatures récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 */
applicationRouter.get("/user", jwtMiddleware(roleStudent), getApplicationsByUserController);

/**
 * @swagger
 * /applications/all:
 *   get:
 *     summary: Récupère toutes les candidatures (admin uniquement)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de toutes les candidatures récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 */
applicationRouter.get("/all", jwtMiddleware([Role.ADMIN]), getAllApplicationsController);

/**
 * @swagger
 * /applications/{applicationId}/status:
 *   put:
 *     summary: Met à jour le statut d'une candidature (recruteur)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, reviewed, accepted, rejected]
 *                 example: "accepted"
 *     responses:
 *       200:
 *         description: Statut mis à jour avec succès
 *       400:
 *         description: Statut invalide
 *       404:
 *         description: Candidature non trouvée
 */
applicationRouter.put("/:applicationId/status", jwtMiddleware(roleEntreprise), updateApplicationStatusController);

/**
 * @swagger
 * /applications/{applicationId}:
 *   get:
 *     summary: Récupère une candidature par son ID
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Candidature récupérée avec succès
 *       404:
 *         description: Candidature non trouvée
 */
applicationRouter.get("/:applicationId", jwtMiddleware([...roleStudent, ...roleEntreprise]), getApplicationController);

export default applicationRouter;

