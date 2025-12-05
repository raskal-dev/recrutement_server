import { QueryInterface } from "sequelize";
import bcrypt from "bcrypt";
import { Role } from "../Utils/Enums/Role.enum";

export = {
    async up(queryInterface: QueryInterface) {
        // Vérifier si l'admin existe déjà
        const [existingAdmin] = await queryInterface.sequelize.query(
            `SELECT id FROM users WHERE email = 'admin@recrutement.com' LIMIT 1`
        ) as any[];

        if (Array.isArray(existingAdmin) && existingAdmin.length > 0) {
            console.log("ℹ️  Le compte admin existe déjà, ignoré.");
            return;
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash("admin123", 10);

        // Créer le compte admin
        await queryInterface.bulkInsert("users", [
            {
                id: "00000000-0000-0000-0000-000000000001",
                name: "Administrateur",
                email: "admin@recrutement.com",
                password: hashedPassword,
                role: Role.ADMIN,
                about: "Administrateur système de la plateforme de recrutement",
                adress: "Siège social",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});

        console.log("✅ Compte admin créé avec succès !");
        console.log("📧 Email: admin@recrutement.com");
        console.log("🔑 Mot de passe: admin123");
        console.log("⚠️  IMPORTANT: Changez le mot de passe après la première connexion !");
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete("users", {
            email: "admin@recrutement.com",
        });
        console.log("🗑️  Compte admin supprimé.");
    },
};

