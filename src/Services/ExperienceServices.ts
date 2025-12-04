import { db } from "../Models";
import { BaseError } from "../Utils/BaseErrer";
import { IExperience } from "../Utils/Interface/IExperience";

const Experience = db.experiences as any;

export const getExperiences = async () => {
    return await Experience.findAll({
        order: [['startDate', 'DESC']]
    });
};

export const getExperiencesByUser = async (userId: string) => {
    return await Experience.findAll({
        where: { UserId: userId },
        order: [['startDate', 'DESC']]
    });
};

export const getExperience = async (id: number) => {
    const existingExperience = await Experience.findByPk(id);
    if (!existingExperience) {
        throw new BaseError("Experience not found", 404);
    }

    return existingExperience;
};

export const createExperience = async (experience: IExperience) => {
    return await Experience.create(experience);
};

export const updateExperience = async (id: number, userId: string, experience: Partial<IExperience>) => {
    const existingExperience = await Experience.findOne({
        where: { id, UserId: userId }
    });
    
    if (!existingExperience) {
        throw new BaseError("Experience not found", 404);
    }

    await Experience.update(experience, { where: { id, UserId: userId } });
    return await Experience.findByPk(id);
};

export const deleteExperience = async (id: number, userId: string) => {
    const existingExperience = await Experience.findOne({
        where: { id, UserId: userId }
    });
    
    if (!existingExperience) {
        throw new BaseError("Experience not found", 404);
    }

    await Experience.destroy({ where: { id, UserId: userId } });
    return { message: "Expérience supprimée avec succès" };
};
