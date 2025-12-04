import { db } from "../Models";
import { BaseError } from "../Utils/BaseErrer";
import { IApplication } from "../Utils/Interface/IApplication";
import logger from "../Configs/Logger.config";

const Application = db.applications as any;
const User = db.users as any;
const Offer = db.offers as any;

export const createApplication = async (application: IApplication) => {
    // Vérifier si l'offre existe
    const offer = await Offer.findByPk(application.OfferId);
    if (!offer) {
        throw new BaseError("Offre non trouvée", 404);
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(application.UserId);
    if (!user) {
        throw new BaseError("Utilisateur non trouvé", 404);
    }

    // Vérifier si l'utilisateur n'a pas déjà postulé à cette offre
    const existingApplication = await Application.findOne({
        where: {
            UserId: application.UserId,
            OfferId: application.OfferId,
        },
    });

    if (existingApplication) {
        throw new BaseError("Vous avez déjà postulé à cette offre", 400);
    }

    return await Application.create(application);
};

export const getApplicationsByOffer = async (offerId: string) => {
    // Vérifier si l'offre existe
    const offer = await Offer.findByPk(offerId);
    if (!offer) {
        throw new BaseError("Offre non trouvée", 404);
    }

    return await Application.findAll({
        where: { OfferId: offerId },
        include: [
            {
                model: User,
                attributes: ["id", "name", "email", "about", "adress", "role"],
            },
            {
                model: Offer,
                attributes: ["id", "title", "description"],
            },
        ],
        order: [["createdAt", "DESC"]],
    });
};

export const getApplicationsByUser = async (userId: string) => {
    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) {
        throw new BaseError("Utilisateur non trouvé", 404);
    }

    return await Application.findAll({
        where: { UserId: userId },
        include: [
            {
                model: Offer,
                attributes: ["id", "title", "description", "salary", "localisation", "contract"],
                include: [
                    {
                        model: User,
                        attributes: ["id", "name", "email"],
                    },
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    });
};

export const updateApplicationStatus = async (
    applicationId: string,
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
) => {
    const application = await Application.findByPk(applicationId);
    if (!application) {
        throw new BaseError("Candidature non trouvée", 404);
    }

    await Application.update(
        { status },
        { where: { id: applicationId } }
    );

    return await Application.findByPk(applicationId, {
        include: [
            {
                model: User,
                attributes: ["id", "name", "email", "about", "adress", "role"],
            },
            {
                model: Offer,
                attributes: ["id", "title", "description"],
            },
        ],
    });
};

export const getApplication = async (applicationId: string) => {
    const application = await Application.findByPk(applicationId, {
        include: [
            {
                model: User,
                attributes: ["id", "name", "email", "about", "adress", "role"],
            },
            {
                model: Offer,
                attributes: ["id", "title", "description", "salary", "localisation", "contract"],
            },
        ],
    });

    if (!application) {
        throw new BaseError("Candidature non trouvée", 404);
    }

    return application;
};

