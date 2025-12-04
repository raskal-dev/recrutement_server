import { Request, Response } from "express";
import { SendError, SendResponse } from "../Middlewares/SendResponse.middleware";
import { BaseError } from "../Utils/BaseErrer";
import { createExperience, getExperience, getExperiences, getExperiencesByUser, updateExperience, deleteExperience } from "../Services/ExperienceServices";
import { IExperience } from "../Utils/Interface/IExperience";

export const getExperiencesController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const user = await req.auth?.user;
        
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

        const dataExperience: IExperience = { 
            ...req.body, 
            UserId: user.id,
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate)
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

        const updateData: Partial<IExperience> = { ...req.body };
        if (updateData.startDate) {
            updateData.startDate = new Date(updateData.startDate as string);
        }
        if (updateData.endDate) {
            updateData.endDate = new Date(updateData.endDate as string);
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