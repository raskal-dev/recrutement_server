import { db } from "../Models";

const resetDatabase = async () => {
    try {
        console.log("🗑️  Suppression de toutes les tables...");
        console.log("⚠️  ATTENTION: Toutes les données seront perdues !\n");
        
        // Supprimer toutes les tables en forçant la synchronisation
        await db.sequelize.sync({ force: true });
        
        console.log("✅ Base de données recréée avec succès !");
        console.log("📦 Toutes les tables ont été supprimées et recréées avec les nouveaux schémas.\n");
    } catch (error: any) {
        console.error("❌ Erreur lors de la recréation de la base de données:", error.message);
        throw error;
    } finally {
        await db.sequelize.close();
    }
};

resetDatabase();

