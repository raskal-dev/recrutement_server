import express from "express";
import {
    createApplicationController,
    getApplicationsByOfferController,
    getApplicationsByUserController,
    updateApplicationStatusController,
    getApplicationController,
} from "../Controllers/Application.controller";
import { jwtMiddleware } from "../Middlewares/jwtMiddleware";
import { Role } from "../Utils/Enums/Role.enum";

const applicationRouter = express.Router();
const roleStudent = [Role.STUDENT];
const roleEntreprise = [Role.ENTREPRISE];

// Les étudiants peuvent créer une candidature
applicationRouter.post("/", jwtMiddleware(roleStudent), createApplicationController);

// Les recruteurs peuvent voir les candidatures pour leurs offres
applicationRouter.get("/offer/:offerId", jwtMiddleware(roleEntreprise), getApplicationsByOfferController);

// Les étudiants peuvent voir leurs propres candidatures
applicationRouter.get("/user", jwtMiddleware(roleStudent), getApplicationsByUserController);

// Les recruteurs peuvent mettre à jour le statut d'une candidature
applicationRouter.put("/:applicationId/status", jwtMiddleware(roleEntreprise), updateApplicationStatusController);

// Obtenir une candidature spécifique
applicationRouter.get("/:applicationId", jwtMiddleware([...roleStudent, ...roleEntreprise]), getApplicationController);

export default applicationRouter;

