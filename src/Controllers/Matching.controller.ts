import { Request, Response } from 'express';
import { SendError, SendResponse } from '../Middlewares/SendResponse.middleware';
import { BaseError } from '../Utils/BaseErrer';
import { calculateMatchingScore, getOffersWithMatching } from '../Services/MatchingService';

export const getMatchingScoreController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request'
        const user = req.auth.user;
        const { offerId } = req.params;

        if (!user) {
            return SendError(res, "Utilisateur non trouvé", 404);
        }

        if (!offerId) {
            return SendError(res, "ID de l'offre requis", 400);
        }

        const score = await calculateMatchingScore(user.id, offerId);
        SendResponse(res, { score, offerId }, "Score de matching calculé avec succès");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        return SendError(res, err.message, 500);
    }
};

export const getOffersWithMatchingController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request'
        const user = req.auth.user;

        if (!user) {
            return SendError(res, "Utilisateur non trouvé", 404);
        }

        const offers = await getOffersWithMatching(user.id);
        SendResponse(res, offers, "Offres avec scores de matching récupérées avec succès");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        return SendError(res, err.message, 500);
    }
};

