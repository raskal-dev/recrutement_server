import { DataTypes, Sequelize } from "sequelize";

const OfferCompetence = (sequelize: Sequelize) => {
    return sequelize.define(
        'OfferCompetence',
        {
            offerId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'offers',
                    key: 'id'
                }
            },
            competenceId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'competences',
                    key: 'id'
                }
            }
        }, 
        {
            timestamps: true,
            tableName: 'offercompetences',
        }
    );
};

export default OfferCompetence;

