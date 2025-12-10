import { Request, Response } from 'express';
import { SendError, SendResponse } from '../Middlewares/SendResponse.middleware';
import { BaseError } from '../Utils/BaseErrer';
import { chatWithAI, analyzeCV, generateJobDescription, extractTextFromFile } from '../Services/AIServices';

export const chatController = async (req: Request, res: Response) => {
    try {
        const { messages, model, temperature, max_tokens } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return SendError(res, 'Les messages sont requis', 400);
        }

        const result = await chatWithAI({
            messages,
            model,
            temperature: temperature || 0.7,
            max_tokens: max_tokens || 1000,
        });

        SendResponse(res, result, 'Réponse générée avec succès');
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        return SendError(res, err.message || 'Erreur lors de la communication avec l\'IA', 500);
    }
};

export const analyzeCVController = async (req: Request, res: Response) => {
    try {
        const { cv_text, job_description } = req.body;

        if (!cv_text) {
            return SendError(res, 'Le texte du CV est requis', 400);
        }

        const result = await analyzeCV(cv_text, job_description);
        SendResponse(res, result, 'CV analysé avec succès');
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        return SendError(res, err.message || 'Erreur lors de l\'analyse du CV', 500);
    }
};

export const generateJobDescriptionController = async (req: Request, res: Response) => {
    try {
        const { title, company, requirements, skills } = req.body;

        if (!title || !company) {
            return SendError(res, 'Le titre et le nom de l\'entreprise sont requis', 400);
        }

        const result = await generateJobDescription(
            title,
            company,
            requirements || [],
            skills || []
        );
        SendResponse(res, result, 'Description de poste générée avec succès');
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        return SendError(res, err.message || 'Erreur lors de la génération de la description', 500);
    }
};

export const extractTextController = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return SendError(res, 'Aucun fichier fourni', 400);
        }

        const result = await extractTextFromFile(req.file);
        SendResponse(res, result, 'Texte extrait avec succès');
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        return SendError(res, err.message || 'Erreur lors de l\'extraction du texte', 500);
    }
};

