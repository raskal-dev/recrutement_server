import { DataTypes, Sequelize } from "sequelize";

const UserCompetence = (sequelize: Sequelize) => {
    return sequelize.define(
        'UserCompetence',
        {
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            competenceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Competences',
                    key: 'id'
                }
            }
        }, 
        {
            timestamps: true,
        }
    );
};

export default UserCompetence;