import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export = {
    async up(queryInterface: QueryInterface) {
        const competences = [
            { id: uuidv4(), name: "JavaScript", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Python", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Java", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "C++", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "PHP", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "HTML", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "CSS", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "React", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Angular", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Vue.js", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Node.js", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Express.js", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Laravel", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Django", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Flask", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Spring Boot", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "MySQL", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "PostgreSQL", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "MongoDB", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Docker", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Kubernetes", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "AWS", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Azure", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Git", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "GitHub", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "CI/CD", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "TypeScript", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Sass", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Tailwind CSS", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Redis", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "GraphQL", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Jenkins", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Webpack", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Gulp", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Nginx", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Apache", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Agile Methodology", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Scrum", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Unit Testing", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Integration Testing", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Machine Learning", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Data Analysis", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Big Data", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "REST API", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "SOAP", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Microservices", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "UI/UX Design", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Figma", createdAt: new Date(), updatedAt: new Date() },
            { id: uuidv4(), name: "Adobe XD", createdAt: new Date(), updatedAt: new Date() }
        ];

        await queryInterface.bulkInsert('competences', competences, {});
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('competences', {});
    }
};
