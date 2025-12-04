import { NextFunction, Request, Response } from "express";
import { addCompetenceToUser, createUser, deleteUser, getProfile, getUser, getUsers, login, updateUser } from "../Services/UserServices";
import { SendError, SendResponse } from "../Middlewares/SendResponse.middleware";
import { IUser } from "../Utils/Interface/IUser";
import bcrypt from 'bcrypt';
import { BaseError } from "../Utils/BaseErrer";

export const getProfileController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const userId = await req.auth.user.id;
        if (!userId) {
            return SendError(res, "Utilisateur non trouvé", 404);
        }
        
        const user = await getProfile(userId);
        SendResponse(res, user, "Profil de l'utilisateur");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const addCompetenceToUserController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const competenceIds = req.body.competenceIds as number[];

        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const userId = await req.auth.user.id;

        if (!userId) {
            return SendError(res, "Utilisateur non authentifié", 401);
        }

        const result = await addCompetenceToUser(userId, competenceIds);
        SendResponse(res, result, "Compétence ajoutée avec succès");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const getUsersController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsers();
        SendResponse(res, users, "Liste des Users");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, err.message, 500);
    }
};

export const getUserController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;

        const user = await getUser(userId);
        SendResponse(res, user, "Utilisateur trouvé");
    }
    catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, err.message, 500);
    }
};

export const createUserController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        const user = await createUser(req.body as IUser);
        SendResponse(res, user, "Insertion de User");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, err.message, 500);
    }
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId; // UUID depuis l'URL

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await updateUser(userId, req.body);
        SendResponse(res, updatedUser, "Utilisateur modifié avec succès");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, err.message, 500);
    }
};

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;

        const result = await deleteUser(userId);
        SendResponse(res, result, "Suppression de l'utilisateur réussie");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, err.message, 500);
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await login(req);
        // Structure de réponse sécurisée : seulement les données nécessaires
        SendResponse(res, {
            user: result.user,
            token: result.token
        }, "Connexion réussie");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, err.message, 500);
    }
};