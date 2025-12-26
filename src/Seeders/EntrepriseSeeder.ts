import { QueryInterface } from "sequelize";
import bcrypt from "bcrypt";
import { Role } from "../Utils/Enums/Role.enum";

export = {
    async up(queryInterface: QueryInterface) {
        // Vérifier si l'entreprise existe déjà
        const [existingEntreprise] = await queryInterface.sequelize.query(
            `SELECT id FROM users WHERE email = 'entreprise@recrutement.com' LIMIT 1`
        ) as any[];

        let entrepriseId: string;

        if (Array.isArray(existingEntreprise) && existingEntreprise.length > 0) {
            console.log("ℹ️  Le compte entreprise existe déjà, utilisation de l'ID existant.");
            entrepriseId = existingEntreprise[0].id;
        } else {
            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash("entreprise123", 10);

            // Créer le compte entreprise
            entrepriseId = "00000000-0000-0000-0000-000000000002";
            
            await queryInterface.bulkInsert("users", [
                {
                    id: entrepriseId,
                    name: "TechCorp Solutions",
                    email: "entreprise@recrutement.com",
                    password: hashedPassword,
                    role: Role.ENTREPRISE,
                    about: "Entreprise leader dans le développement de solutions technologiques innovantes",
                    adress: "Paris, France",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ], {});

            console.log("✅ Compte entreprise créé avec succès !");
            console.log("📧 Email: entreprise@recrutement.com");
            console.log("🔑 Mot de passe: entreprise123");
        }

        // Vérifier si l'offre existe déjà
        const [existingOffer] = await queryInterface.sequelize.query(
            `SELECT id FROM offers WHERE "UserId" = '${entrepriseId}' LIMIT 1`
        ) as any[];

        if (Array.isArray(existingOffer) && existingOffer.length > 0) {
            console.log("ℹ️  L'offre existe déjà, ignorée.");
            return;
        }

        // Créer une offre d'emploi
        await queryInterface.bulkInsert("offers", [
            {
                id: "00000000-0000-0000-0000-000000000010",
                title: "Développeur Full Stack Senior",
                description: `Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe dynamique.

**Missions principales :**
- Développement d'applications web modernes avec React et Node.js
- Conception et maintenance d'APIs RESTful
- Collaboration avec l'équipe produit pour définir les fonctionnalités
- Participation aux code reviews et amélioration continue

**Profil recherché :**
- Minimum 3 ans d'expérience en développement Full Stack
- Maîtrise de React, Node.js, TypeScript
- Connaissance de bases de données (PostgreSQL, MongoDB)
- Expérience avec Docker et CI/CD
- Bonne communication et esprit d'équipe

**Avantages :**
- Télétravail flexible
- Environnement de travail stimulant
- Équipement fourni
- Formation continue`,
                salary: "50k€ - 70k€ / an",
                localisation: "Paris, France (Télétravail possible)",
                contract: "CDI",
                UserId: entrepriseId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "00000000-0000-0000-0000-000000000011",
                title: "Développeur Backend Python",
                description: `Rejoignez notre équipe backend pour développer des solutions robustes et scalables.

**Responsabilités :**
- Développement d'APIs performantes avec FastAPI
- Optimisation des performances et de la scalabilité
- Mise en place de tests automatisés
- Documentation technique

**Compétences requises :**
- Python, FastAPI, Django
- PostgreSQL, Redis
- Docker, Kubernetes
- Tests unitaires et d'intégration`,
                salary: "45k€ - 65k€ / an",
                localisation: "Lyon, France",
                contract: "CDI",
                UserId: entrepriseId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "00000000-0000-0000-0000-000000000012",
                title: "Développeur Frontend React",
                description: `Nous cherchons un développeur Frontend passionné pour créer des interfaces utilisateur exceptionnelles.

**Votre mission :**
- Développer des interfaces React modernes et responsives
- Optimiser les performances frontend
- Collaborer avec les designers UX/UI
- Maintenir et améliorer le code existant

**Profil idéal :**
- React, TypeScript, Next.js
- Tailwind CSS, shadcn/ui
- Expérience avec les animations (Framer Motion)
- Sens du design et attention aux détails`,
                salary: "40k€ - 60k€ / an",
                localisation: "Remote (France)",
                contract: "CDI",
                UserId: entrepriseId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});

        console.log("✅ Offres d'emploi créées avec succès !");
        console.log("📋 3 offres disponibles pour tester");
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete("offers", {
            UserId: "00000000-0000-0000-0000-000000000002",
        });
        await queryInterface.bulkDelete("users", {
            email: "entreprise@recrutement.com",
        });
        console.log("🗑️  Compte entreprise et offres supprimés.");
    },
};

