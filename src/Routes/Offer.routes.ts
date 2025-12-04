import express, { NextFunction, Request, Response } from "express";
import { createOfferController, deleteOfferController, getOffersController, getOfferController, updateOfferController } from "../Controllers/Offer.controller";
import { jwtMiddleware } from "../Middlewares/jwtMiddleware";
import { Role } from "../Utils/Enums/Role.enum";

const offerRouter = express.Router();
const roleEntreprise = [Role.ENTREPRISE];
const roleStudent = [Role.STUDENT];

/**
 * @swagger
 * /offers:
 *   get:
 *     summary: Récupère la liste de toutes les offres d'emploi
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des offres récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Offer'
 */
offerRouter.get("/", jwtMiddleware(roleStudent), getOffersController);

/**
 * @swagger
 * /offers/{offerId}:
 *   get:
 *     summary: Récupère une offre d'emploi par son ID
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de l'offre
 *     responses:
 *       200:
 *         description: Offre récupérée avec succès
 *       404:
 *         description: Offre non trouvée
 */
offerRouter.get("/:offerId", jwtMiddleware([...roleStudent, ...roleEntreprise]), getOfferController);

/**
 * @swagger
 * /offers:
 *   post:
 *     summary: Crée une nouvelle offre d'emploi
 *     tags: [Offers]
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
 *               - salary
 *               - localisation
 *               - contract
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Développeur Full Stack"
 *               description:
 *                 type: string
 *                 example: "Nous recherchons un développeur Full Stack expérimenté..."
 *               salary:
 *                 type: string
 *                 example: "50k-70k€"
 *               localisation:
 *                 type: string
 *                 example: "Paris, France"
 *               contract:
 *                 type: string
 *                 example: "CDI"
 *     responses:
 *       201:
 *         description: Offre créée avec succès
 *       400:
 *         description: Données invalides
 */
offerRouter.post("/", jwtMiddleware(roleEntreprise) , createOfferController);

/**
 * @swagger
 * /offers/{offerId}:
 *   put:
 *     summary: Met à jour une offre d'emploi
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: offerId
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
 *               salary:
 *                 type: string
 *               localisation:
 *                 type: string
 *               contract:
 *                 type: string
 *     responses:
 *       200:
 *         description: Offre mise à jour avec succès
 *       404:
 *         description: Offre non trouvée
 */
offerRouter.put("/:offerId", jwtMiddleware(roleEntreprise), updateOfferController);

/**
 * @swagger
 * /offers/{offerId}:
 *   delete:
 *     summary: Supprime une offre d'emploi
 *     tags: [Offers]
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
 *         description: Offre supprimée avec succès
 *       404:
 *         description: Offre non trouvée
 */
offerRouter.delete("/:offerId", jwtMiddleware(roleEntreprise), deleteOfferController);

export default offerRouter;