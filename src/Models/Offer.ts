import { DataTypes, Sequelize } from "sequelize";

const Offer = (sequelize: Sequelize) => {
    return sequelize.define(
        'Offer',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(80),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            salary: {
                type: DataTypes.STRING(25),
                allowNull: false,
            },
            localisation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            contract: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            UserId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            }
        }, {
            timestamps: true,
            tableName: 'offers',
        }
    );
}

export default Offer;