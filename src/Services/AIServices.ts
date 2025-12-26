import axios from 'axios';
import { BaseError } from '../Utils/BaseErrer';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
const AI_INTERNAL_TOKEN = process.env.AI_INTERNAL_TOKEN;

const getHeaders = () => {
    if (!AI_INTERNAL_TOKEN) {
        throw new BaseError("AI_INTERNAL_TOKEN manquant côté backend", 500);
    }
    return {
        'x-internal-token': AI_INTERNAL_TOKEN,
    };
};

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface ChatRequest {
    messages: ChatMessage[];
    model?: string;
    temperature?: number;
    max_tokens?: number;
}

export const chatWithAI = async (request: ChatRequest) => {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/ai/chat`, request, {
            timeout: 30000,
            headers: getHeaders(),
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new BaseError(
                error.response.data?.detail || 'Erreur lors de la communication avec le service IA',
                error.response.status
            );
        }
        throw new BaseError('Service IA indisponible', 503);
    }
};

export const analyzeCV = async (cvText: string, jobDescription?: string) => {
    try {
        const response = await axios.post(
            `${AI_SERVICE_URL}/ai/analyze-cv`,
            {
                cv_text: cvText,
                job_description: jobDescription,
            },
            {
                timeout: 60000, // 60 secondes pour l'analyse
                headers: getHeaders(),
            }
        );
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new BaseError(
                error.response.data?.detail || 'Erreur lors de l\'analyse du CV',
                error.response.status
            );
        }
        throw new BaseError('Service IA indisponible', 503);
    }
};

export const generateJobDescription = async (
    title: string,
    company: string,
    requirements: string[],
    skills: string[]
) => {
    try {
        const response = await axios.post(
            `${AI_SERVICE_URL}/ai/generate-job-description`,
            {
                title,
                company,
                requirements,
                skills,
            },
            {
                timeout: 30000,
                headers: getHeaders(),
            }
        );
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new BaseError(
                error.response.data?.detail || 'Erreur lors de la génération de la description',
                error.response.status
            );
        }
        throw new BaseError('Service IA indisponible', 503);
    }
};

export const extractTextFromFile = async (file: Express.Multer.File) => {
    try {
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('file', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype,
        });

        const response = await axios.post(
            `${AI_SERVICE_URL}/ai/extract-text`,
            formData,
            {
                timeout: 60000, // 60 secondes pour l'extraction
                headers: {
                    ...getHeaders(),
                    ...formData.getHeaders(),
                },
            }
        );
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new BaseError(
                error.response.data?.detail || 'Erreur lors de l\'extraction du texte',
                error.response.status
            );
        }
        throw new BaseError('Service IA indisponible', 503);
    }
};

