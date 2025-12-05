import { db } from "../Models";
import CompetencesSeeder from "./CompetencesSeeder";
import AdminSeeder from "./AdminSeeder";
const sequelize = db.sequelize;

const runSeeder = async () => {
    try {
        console.log("🌱 Démarrage des seeders...\n");
        
        // Exécuter le seeder des compétences
        console.log("📚 Création des compétences...");
        await CompetencesSeeder.up(sequelize.getQueryInterface());
        
        // Exécuter le seeder de l'admin
        console.log("\n👤 Création du compte administrateur...");
        await AdminSeeder.up(sequelize.getQueryInterface());
        
        console.log("\n✅ Tous les seeders ont été exécutés avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors de l'exécution des seeders :", error);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
}

runSeeder();