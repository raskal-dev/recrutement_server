import { Sequelize, DataTypes } from 'sequelize';
import { Role } from '../Utils/Enums/Role.enum';

const User = (sequelize: Sequelize) => {
    return sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            about: {
                type: DataTypes.STRING
            },
            adress: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            role: {
                type: DataTypes.ENUM(Role.ADMIN, Role.STUDENT, Role.ENTREPRISE),
                allowNull: false,
                defaultValue: Role.STUDENT,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, {
            timestamps: true,
            tableName: 'users',
        }
    );
}
export default User;