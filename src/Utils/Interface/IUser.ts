import { Role } from "../Enums/Role.enum";

export interface IUser {
    id?: string;
    name: string;
    about?: string;
    adress?: string;
    email: string;
    password: string;
    role: Role;
    createdAt?: Date;
    updatedAt?: Date;
}