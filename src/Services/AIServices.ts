import axios from 'axios';
import { BaseError } from '../Utils/BaseErrer';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

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
        const response = await axios.post(`${AI_SERVICE_URL}/chat`, request, {
            timeout: 30000,
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
            `${AI_SERVICE_URL}/analyze-cv`,
            {
                cv_text: cvText,
                job_description: jobDescription,
            },
            {
                timeout: 60000, // 60 secondes pour l'analyse
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
            `${AI_SERVICE_URL}/generate-job-description`,
            {
                title,
                company,
                requirements,
                skills,
            },
            {
                timeout: 30000,
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

