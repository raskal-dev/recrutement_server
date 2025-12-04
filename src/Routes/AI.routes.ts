import express from 'express';
import { Role } from '../Utils/Enums/Role.enum';
import { jwtMiddleware } from '../Middlewares/jwtMiddleware';
import {
    chatController,
    analyzeCVController,
    generateJobDescriptionController,
} from '../Controllers/AI.controller';

const aiRouter = express.Router();
const roleStudent = [Role.STUDENT];
const roleEntreprise = [Role.ENTREPRISE];

// Chat avec l'IA
aiRouter.post('/chat', jwtMiddleware([...roleStudent, ...roleEntreprise]), chatController);

// Analyse de CV
aiRouter.post('/analyze-cv', jwtMiddleware([...roleStudent, ...roleEntreprise]), analyzeCVController);

// Génération de description de poste (pour les entreprises)
aiRouter.post('/generate-job-description', jwtMiddleware(roleEntreprise), generateJobDescriptionController);

export default aiRouter;

