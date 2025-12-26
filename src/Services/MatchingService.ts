import { db } from "../Models";
import logger from "../Configs/Logger.config";
import { BaseError } from "../Utils/BaseErrer";

const User = db.users as any;
const Offer = db.offers as any;
const Competence = db.competences as any;

/**
 * Calcule le score de matching entre un utilisateur et une offre
 * Basé sur le pourcentage de compétences correspondantes
 */
export const calculateMatchingScore = async (userId: string, offerId: string): Promise<number> => {
    try {
        // Récupérer les compétences de l'utilisateur
        const user = await User.findByPk(userId, {
            include: [{
                model: Competence,
                as: 'Competences',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }]
        });

        if (!user) {
            throw new BaseError("Utilisateur non trouvé", 404);
        }

        // Récupérer les compétences requises pour l'offre
        const offer = await Offer.findByPk(offerId, {
            include: [{
                model: Competence,
                as: 'Competences',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }]
        });

        if (!offer) {
            throw new BaseError("Offre non trouvée", 404);
        }

        const userCompetences = user.Competences || [];
        const offerCompetences = offer.Competences || [];

        // Si l'offre n'a pas de compétences requises, retourner 0
        if (offerCompetences.length === 0) {
            return 0;
        }

        // Calculer le nombre de compétences correspondantes
        const userCompetenceIds = new Set(userCompetences.map((c: any) => c.id));
        const matchingCompetences = offerCompetences.filter((c: any) => userCompetenceIds.has(c.id));

        // Calculer le pourcentage de matching
        const matchingScore = Math.round((matchingCompetences.length / offerCompetences.length) * 100);

        return matchingScore;
    } catch (error: any) {
        logger.error(`Erreur lors du calcul du score de matching: ${error.message}`);
        if (error instanceof BaseError) {
            throw error;
        }
        throw new BaseError("Erreur lors du calcul du score de matching", 500);
    }
};

/**
 * Récupère toutes les offres avec leur score de matching pour un utilisateur
 */
export const getOffersWithMatching = async (userId: string) => {
    try {
        const user = await User.findByPk(userId, {
            include: [{
                model: Competence,
                as: 'Competences',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }]
        });

        if (!user) {
            throw new BaseError("Utilisateur non trouvé", 404);
        }

        const userCompetenceIds = new Set((user.Competences || []).map((c: any) => c.id));

        // Récupérer toutes les offres avec leurs compétences
        const offers = await Offer.findAll({
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
            order: [['createdAt', 'DESC']],
        });

        // Calculer le score de matching pour chaque offre
        const offersWithMatching = await Promise.all(
            offers.map(async (offer: any) => {
                const offerCompetences = offer.Competences || [];
                
                let matchingScore = 0;
                if (offerCompetences.length > 0) {
                    const matchingCompetences = offerCompetences.filter((c: any) => 
                        userCompetenceIds.has(c.id)
                    );
                    matchingScore = Math.round((matchingCompetences.length / offerCompetences.length) * 100);
                }

                return {
                    ...offer.toJSON(),
                    matchingScore,
                    matchingCompetences: offerCompetences.filter((c: any) => 
                        userCompetenceIds.has(c.id)
                    ).map((c: any) => ({ id: c.id, name: c.name })),
                    missingCompetences: offerCompetences.filter((c: any) => 
                        !userCompetenceIds.has(c.id)
                    ).map((c: any) => ({ id: c.id, name: c.name }))
                };
            })
        );

        // Trier par score de matching décroissant
        offersWithMatching.sort((a, b) => b.matchingScore - a.matchingScore);

        return offersWithMatching;
    } catch (error: any) {
        logger.error(`Erreur lors de la récupération des offres avec matching: ${error.message}`);
        if (error instanceof BaseError) {
            throw error;
        }
        throw new BaseError("Erreur lors de la récupération des offres avec matching", 500);
    }
};

