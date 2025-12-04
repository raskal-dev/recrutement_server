import { DataTypes, Sequelize } from "sequelize";

const UserCompetence = (sequelize: Sequelize) => {
    return sequelize.define(
        'UserCompetence',
        {
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            competenceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'competences',
                    key: 'id'
                }
            }
        }, 
        {
            timestamps: true,
            tableName: 'usercompetences',
        }
    );
};

export default UserCompetence;