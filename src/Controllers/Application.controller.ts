import { Request, Response } from "express";
import {
    createApplication,
    getApplicationsByOffer,
    getApplicationsByUser,
    updateApplicationStatus,
    getApplication,
    getAllApplications,
} from "../Services/ApplicationServices";
import { SendError, SendResponse } from "../Middlewares/SendResponse.middleware";
import { BaseError } from "../Utils/BaseErrer";
import { IApplication } from "../Utils/Interface/IApplication";

export const createApplicationController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const user = req.auth.user;

        if (!user) {
            return SendError(res, "Utilisateur non trouvé", 404);
        }

        const { OfferId, coverLetter } = req.body;

        if (!OfferId) {
            return SendError(res, "L'ID de l'offre est requis", 400);
        }

        const applicationData: IApplication = {
            UserId: user.id,
            OfferId,
            coverLetter: coverLetter || undefined,
            status: 'pending',
        };

        const application = await createApplication(applicationData);
        SendResponse(res, application, "Candidature créée avec succès");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const getApplicationsByOfferController = async (req: Request, res: Response) => {
    try {
        const offerId = req.params.offerId;

        if (!offerId) {
            return SendError(res, "L'ID de l'offre est requis", 400);
        }

        const applications = await getApplicationsByOffer(offerId);
        SendResponse(res, applications, "Liste des candidatures pour cette offre");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const getApplicationsByUserController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const user = req.auth.user;

        if (!user) {
            return SendError(res, "Utilisateur non trouvé", 404);
        }

        const applications = await getApplicationsByUser(user.id);
        SendResponse(res, applications, "Liste de vos candidatures");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const updateApplicationStatusController = async (req: Request, res: Response) => {
    try {
        const applicationId = req.params.applicationId;
        const { status } = req.body;

        if (!applicationId) {
            return SendError(res, "L'ID de la candidature est requis", 400);
        }

        if (!status || !['pending', 'reviewed', 'accepted', 'rejected'].includes(status)) {
            return SendError(res, "Le statut est requis et doit être: pending, reviewed, accepted ou rejected", 400);
        }

        const application = await updateApplicationStatus(applicationId, status);
        SendResponse(res, application, "Statut de la candidature mis à jour avec succès");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const getApplicationController = async (req: Request, res: Response) => {
    try {
        const applicationId = req.params.applicationId;

        if (!applicationId) {
            return SendError(res, "L'ID de la candidature est requis", 400);
        }

        const application = await getApplication(applicationId);
        SendResponse(res, application, "Candidature trouvée");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const getAllApplicationsController = async (req: Request, res: Response) => {
    try {
        const applications = await getAllApplications();
        SendResponse(res, applications, "Liste de toutes les candidatures");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

