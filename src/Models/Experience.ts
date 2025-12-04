import { DataTypes, Sequelize } from "sequelize";

const Experience = (sequelize: Sequelize) => {
    return sequelize.define(
        'Experience',
        {
            title: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        }, {
            timestamps: true,
            tableName: 'experiences',
        }
    );
}

export default Experience;