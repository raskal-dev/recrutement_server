import { DataTypes, Sequelize } from "sequelize";

const Application = (sequelize: Sequelize) => {
    return sequelize.define(
        'Application',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            status: {
                type: DataTypes.ENUM('pending', 'reviewed', 'accepted', 'rejected'),
                defaultValue: 'pending',
                allowNull: false,
            },
            coverLetter: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            UserId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            OfferId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'offers',
                    key: 'id',
                },
            },
        },
        {
            timestamps: true,
            tableName: 'applications',
            indexes: [
                {
                    unique: true,
                    fields: ['UserId', 'OfferId'],
                    name: 'unique_user_offer_application'
                }
            ]
        }
    );
};

export default Application;

