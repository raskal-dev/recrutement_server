import { Sequelize } from "sequelize";
import DbConfig from "../Configs/Db.config";
import UserImport from "./User";
import Offer from "./Offer";
import Competence from "./Competence";
import UserCompetence from "./UserCompetence";
import moment from "moment";
import baselogger from "../Configs/Logger.config";
import Experience from "./Experience";
import Application from "./Application";
// import CompetencesSeeder from "../Seeders/CompetencesSeeder";


const sequelize = new Sequelize(DbConfig.DB, DbConfig.USER, DbConfig.PASSWORD, {
    host: DbConfig.HOST,
    dialect: DbConfig.dialect,
    logging: false, // Désactiver l'affichage des requêtes SQL
  
    pool: {
      max: DbConfig.pool.max,
      min: DbConfig.pool.min,
      acquire: DbConfig.pool.acquire,
      idle: DbConfig.pool.idle
    }
  });

const db = {} as any;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * call the models
 */

db.users = UserImport(sequelize);
db.offers = Offer(sequelize);
db.competences = Competence(sequelize)
db.userCompetences = UserCompetence(sequelize);
db.experiences = Experience(sequelize);
db.applications = Application(sequelize);

/**
 * Define the R E L A T I O N S H I P S
 */
db.users.hasMany(db.offers);
db.offers.belongsTo(db.users);
db.users.belongsToMany(db.competences, { through: 'usercompetences' });
db.competences.belongsToMany(db.users, { through: 'usercompetences' });
db.users.hasMany(db.experiences);
db.experiences.belongsTo(db.users);
db.users.hasMany(db.applications);
db.applications.belongsTo(db.users);
db.offers.hasMany(db.applications);
db.applications.belongsTo(db.offers);

const ConnectionDb = async () => {
  const formattedTime = moment().format('HH:mm:ss');
    try {
        await db.sequelize.sync({  force: false, alter: true});
        // console.info(`[INFO] ${formattedTime} Base de données synchronisée avec succès !`);
        baselogger.info("Database synchronized successfully !");
    } catch (err: any) {
        // console.log(`[ERR] ${formattedTime} Échec de la synchronisation de la base de données :`, err.message);
        baselogger.error(`Error for sync : ${
            err.message
        }`);
    }
}

export { ConnectionDb, db };