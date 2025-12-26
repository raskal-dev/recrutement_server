export interface IExperience {
    id?: string;
    title: string;
    description: string;
    startDate: Date | string;
    endDate: Date | string;
    UserId?: string;
    createdAt?: Date;
    updatedAt?: Date;
};