import express from 'express';
import multer from 'multer';
import { Role } from '../Utils/Enums/Role.enum';
import { jwtMiddleware } from '../Middlewares/jwtMiddleware';
import {
    chatController,
    analyzeCVController,
    generateJobDescriptionController,
    extractTextController,
} from '../Controllers/AI.controller';

// Configuration de multer pour l'upload de fichiers en mémoire
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
        ];
        const allowedExtensions = ['.pdf', '.docx', '.txt'];
        const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));

        if (
            allowedMimes.includes(file.mimetype) ||
            allowedExtensions.includes(fileExtension)
        ) {
            cb(null, true);
        } else {
            cb(new Error('Format de fichier non supporté. Formats acceptés: PDF, DOCX, TXT'));
        }
    },
});

const aiRouter = express.Router();
const roleStudent = [Role.STUDENT];
const roleEntreprise = [Role.ENTREPRISE];

/**
 * @swagger
 * /ai/chat:
 *   post:
 *     summary: Chat avec l'IA via OpenRouter
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messages
 *             properties:
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, assistant, system]
 *                     content:
 *                       type: string
 *               model:
 *                 type: string
 *                 description: Modèle IA à utiliser (optionnel)
 *               temperature:
 *                 type: number
 *                 default: 0.7
 *               max_tokens:
 *                 type: number
 *                 default: 1000
 *     responses:
 *       200:
 *         description: Réponse de l'IA générée avec succès
 *       400:
 *         description: Données invalides
 *       503:
 *         description: Service IA indisponible
 */
aiRouter.post('/chat', jwtMiddleware([...roleStudent, ...roleEntreprise]), chatController);

/**
 * @swagger
 * /ai/analyze-cv:
 *   post:
 *     summary: Analyse un CV avec l'IA
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cv_text
 *             properties:
 *               cv_text:
 *                 type: string
 *                 description: Texte du CV à analyser
 *               job_description:
 *                 type: string
 *                 description: Description de poste pour une analyse ciblée (optionnel)
 *     responses:
 *       200:
 *         description: Analyse du CV terminée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                   description: Résultat de l'analyse
 *                 model:
 *                   type: string
 *       400:
 *         description: Données invalides
 *       503:
 *         description: Service IA indisponible
 */
aiRouter.post('/analyze-cv', jwtMiddleware([...roleStudent, ...roleEntreprise]), analyzeCVController);

/**
 * @swagger
 * /ai/generate-job-description:
 *   post:
 *     summary: Génère une description de poste optimisée avec l'IA (recruteur)
 *     tags: [AI]
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
 *               - company
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Développeur Full Stack"
 *               company:
 *                 type: string
 *                 example: "Ma Startup"
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Bac+5", "3 ans d'expérience"]
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["React", "Node.js", "TypeScript"]
 *     responses:
 *       200:
 *         description: Description générée avec succès
 *       400:
 *         description: Données invalides
 *       503:
 *         description: Service IA indisponible
 */
aiRouter.post('/generate-job-description', jwtMiddleware(roleEntreprise), generateJobDescriptionController);

/**
 * @swagger
 * /ai/extract-text:
 *   post:
 *     summary: Extrait le texte d'un fichier (PDF, DOCX, TXT)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Fichier à analyser (PDF, DOCX ou TXT, max 10MB)
 *     responses:
 *       200:
 *         description: Texte extrait avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   description: Texte extrait
 *                 file_name:
 *                   type: string
 *                 file_type:
 *                   type: string
 *                 character_count:
 *                   type: number
 *       400:
 *         description: Format non supporté ou fichier invalide
 *       503:
 *         description: Service IA indisponible
 */
aiRouter.post(
    '/extract-text',
    jwtMiddleware([...roleStudent, ...roleEntreprise]),
    upload.single('file'),
    extractTextController
);

export default aiRouter;

