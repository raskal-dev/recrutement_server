import logger from "../Configs/Logger.config";
import { db } from "../Models";
import { BaseError } from "../Utils/BaseErrer";
import { IOffer } from "../Utils/Interface/IOffer";

const Offer = db.offers as any;
const Competence = db.competences as any;

export const getOffers = async () => {
    return await Offer.findAll({
        include: [
            {
                model: db.users,
                attributes: ["id", "name", "email", "about", "adress", "role"],
            },
            {
                model: Competence,
                as: 'Competences',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }
        ],
    });
};

export const getOffer = async (id: string) => {
    const existingOffer = await Offer.findByPk(id);
    if (!existingOffer) {
        throw new BaseError("Offre non trouvée", 404);
    }
    
    return await Offer.findByPk(id, {
        include: [
            {
                model: db.users,
                attributes: ["id", "name", "email", "about", "adress", "role"],
            },
        ],
    });
};

export const createOffer = async (offer: IOffer, competenceIds?: string[]) => {
    const newOffer = await Offer.create(offer);
    
    // Ajouter les compétences si fournies
    if (competenceIds && competenceIds.length > 0) {
        await newOffer.setCompetences(competenceIds);
    }
    
    return await Offer.findByPk(newOffer.id, {
        include: [
            {
                model: db.users,
                attributes: ["id", "name", "email", "about", "adress", "role"],
            },
            {
                model: Competence,
                as: 'Competences',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }
        ],
    });
};

export const updateOffer = async (id: string, offer: IOffer) => {
    const existingOffer = await Offer.findByPk(id);
    if (!existingOffer) {
        logger.error("Offer not found");
        throw new BaseError("Offre non trouvée", 404);
    }

    await Offer.update(offer, { where: { id } });

    return await Offer.findByPk(id);
};

export const getOffersByUser = async (userId: string) => {
    return await Offer.findAll({
        where: { UserId: userId },
        include: [
            {
                model: db.users,
                attributes: ["id", "name", "email", "about", "adress", "role"],
            },
        ],
        order: [["createdAt", "DESC"]],
    });
};

export const deleteOffer = async (id: string) => {
    const existingOffer = await Offer.findByPk(id);
    if (!existingOffer) {
        throw new BaseError("Offre non trouvée", 404);
    }

    await Offer.destroy({ where: { id } });

    return { message: "Offre supprimée avec succès" };
};
