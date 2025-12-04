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

// Récupérer toutes les expériences (ou celles de l'utilisateur connecté)
experienceRouter.get("/", jwtMiddleware([...roleStudent, ...roleEntreprise]), getExperiencesController);

// Récupérer les expériences d'un utilisateur spécifique
experienceRouter.get("/user/:userId", jwtMiddleware([...roleStudent, ...roleEntreprise]), getExperiencesByUserController);

// Récupérer une expérience spécifique
experienceRouter.get("/:experienceId", jwtMiddleware([...roleStudent, ...roleEntreprise]), getExperienceController);

// Créer une expérience
experienceRouter.post("/", jwtMiddleware(roleStudent), createExperienceController);

// Modifier une expérience
experienceRouter.put("/:experienceId", jwtMiddleware(roleStudent), updateExperienceController);

// Supprimer une expérience
experienceRouter.delete("/:experienceId", jwtMiddleware(roleStudent), deleteExperienceController);

export default experienceRouter;