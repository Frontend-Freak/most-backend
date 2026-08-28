import prisma from "../prisma.js";

async function plans() {
    await prisma.plan.createMany({
        data: [
            {
                name: "Базовая",
                price: 100,
                interval: "Месяц",
            },
            {
                name: "Средняя",
                price: 300,
                interval: "Месяц",
            },
            {
                name: "Премиум",
                price: 700,
                interval: "Месяц",
            },
        ],
    });
}

plans()
    .then(() => prisma.$disconnect())
    .catch((error) => console.error(error))
    .finally(() => prisma.$disconnect());
