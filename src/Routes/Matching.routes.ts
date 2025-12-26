import express from "express";
import { getMatchingScoreController, getOffersWithMatchingController } from "../Controllers/Matching.controller";
import { jwtMiddleware } from "../Middlewares/jwtMiddleware";
import { Role } from "../Utils/Enums/Role.enum";

const matchingRouter = express.Router();

/**
 * @swagger
 * /matching/offers:
 *   get:
 *     summary: Récupère toutes les offres avec leur score de matching pour l'utilisateur connecté
 *     tags: [Matching]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Offres avec scores de matching récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       matchingScore:
 *                         type: number
 *                         description: Score de matching en pourcentage (0-100)
 *                       matchingCompetences:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             name:
 *                               type: string
 *                       missingCompetences:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             name:
 *                               type: string
 */
matchingRouter.get("/offers", jwtMiddleware([Role.STUDENT]), getOffersWithMatchingController);

/**
 * @swagger
 * /matching/score/{offerId}:
 *   get:
 *     summary: Calcule le score de matching entre l'utilisateur connecté et une offre
 *     tags: [Matching]
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
 *         description: Score de matching calculé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     score:
 *                       type: number
 *                       description: Score de matching en pourcentage (0-100)
 *                     offerId:
 *                       type: string
 */
matchingRouter.get("/score/:offerId", jwtMiddleware([Role.STUDENT]), getMatchingScoreController);

export default matchingRouter;

