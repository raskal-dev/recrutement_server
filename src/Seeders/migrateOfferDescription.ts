import { db } from "../Models";

const migrateOfferDescription = async () => {
    try {
        console.log("🔄 Migration de la colonne description de VARCHAR à TEXT...");
        
        await db.sequelize.query(`
            ALTER TABLE offers ALTER COLUMN description TYPE TEXT;
        `);
        
        console.log("✅ Migration réussie ! La colonne description accepte maintenant des textes longs.");
    } catch (error: any) {
        if (error.message.includes("does not exist")) {
            console.log("ℹ️  La colonne n'existe pas encore, elle sera créée avec le bon type lors de la synchronisation.");
        } else if (error.message.includes("already exists") || error.message.includes("duplicate")) {
            console.log("ℹ️  La colonne est déjà au bon type.");
        } else {
            console.error("❌ Erreur lors de la migration:", error.message);
            throw error;
        }
    } finally {
        await db.sequelize.close();
    }
};

migrateOfferDescription();

