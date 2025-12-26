import { Request, Response } from "express";
import { SendError, SendResponse } from "../Middlewares/SendResponse.middleware";
import { BaseError } from "../Utils/BaseErrer";
import { createExperience, getExperience, getExperiences, getExperiencesByUser, updateExperience, deleteExperience } from "../Services/ExperienceServices";
import { IExperience } from "../Utils/Interface/IExperience";

export const getExperiencesController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const user = req.auth?.user;
        
        // Si un utilisateur est authentifié, récupérer ses expériences, sinon toutes
        const experiences = user 
            ? await getExperiencesByUser(user.id)
            : await getExperiences();
            
        SendResponse(res, experiences, "Expériences trouvées");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const getExperiencesByUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return SendError(res, "ID utilisateur requis", 400);
        }

        const experiences = await getExperiencesByUser(userId);
        SendResponse(res, experiences, "Expériences trouvées");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const getExperienceController = async (req: Request, res: Response) => {
    try {
        const experienceId = req.params.experienceId;
        if (!experienceId) {
            return SendError(res, "ID invalide", 400);
        }

        const experience = await getExperience(experienceId);
        SendResponse(res, experience, "Expérience trouvée");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const createExperienceController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const user = await req.auth.user;

        if (!user) {
            return SendError(res, "Utilisateur non trouvé", 404);
        }

        // Validation des dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const startDate = new Date(req.body.startDate);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(req.body.endDate);
        endDate.setHours(0, 0, 0, 0);

        // Vérifier que les dates ne sont pas dans le futur
        if (startDate > today) {
            return SendError(res, "La date de début ne peut pas être dans le futur", 400);
        }

        if (endDate > today) {
            return SendError(res, "La date de fin ne peut pas être dans le futur", 400);
        }

        // Vérifier que la date de fin est après la date de début
        if (endDate < startDate) {
            return SendError(res, "La date de fin doit être après la date de début", 400);
        }

        const dataExperience: IExperience = { 
            ...req.body, 
            UserId: user.id,
            startDate: startDate,
            endDate: endDate
        };
        const experience = await createExperience(dataExperience);
        SendResponse(res, experience, "Expérience ajoutée avec succès!");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const updateExperienceController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const user = await req.auth.user;

        if (!user) {
            return SendError(res, "Utilisateur non trouvé", 404);
        }

        const experienceId = req.params.experienceId;
        if (!experienceId) {
            return SendError(res, "ID invalide", 400);
        }

        // Validation des dates si elles sont présentes
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const updateData: Partial<IExperience> = { ...req.body };
        
        if (updateData.startDate) {
            const startDate = new Date(updateData.startDate as string);
            startDate.setHours(0, 0, 0, 0);
            
            if (startDate > today) {
                return SendError(res, "La date de début ne peut pas être dans le futur", 400);
            }
            
            updateData.startDate = startDate;
        }
        
        if (updateData.endDate) {
            const endDate = new Date(updateData.endDate as string);
            endDate.setHours(0, 0, 0, 0);
            
            if (endDate > today) {
                return SendError(res, "La date de fin ne peut pas être dans le futur", 400);
            }
            
            updateData.endDate = endDate;
        }

        // Vérifier que la date de fin est après la date de début si les deux sont présentes
        if (updateData.startDate && updateData.endDate) {
            const startDate = new Date(updateData.startDate as Date);
            const endDate = new Date(updateData.endDate as Date);
            
            if (endDate < startDate) {
                return SendError(res, "La date de fin doit être après la date de début", 400);
            }
        }

        const experience = await updateExperience(experienceId, user.id, updateData);
        SendResponse(res, experience, "Expérience modifiée avec succès!");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const deleteExperienceController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const user = await req.auth.user;

        if (!user) {
            return SendError(res, "Utilisateur non trouvé", 404);
        }

        const experienceId = req.params.experienceId;
        if (!experienceId) {
            return SendError(res, "ID invalide", 400);
        }

        const result = await deleteExperience(experienceId, user.id);
        SendResponse(res, result, "Expérience supprimée avec succès!");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};