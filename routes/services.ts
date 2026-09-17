import { Router, type Request, type Response } from "express";
import prisma from "../prisma.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const services = await prisma.service.findMany();

    res.status(200).json(services);
});

router.get("/:id", async (req: Request, res: Response) => {
    const service = await prisma.service.findUnique({
        where: { id: Number(req.params.id) },
    });

    if (!service) {
        return res.status(404).json({ message: "Серивис не найден" });
    }

    res.status(200).json(service);
});

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
        const services = await prisma.service.create({ data: req.body });

        res.status(201).json(services);
    },
);

router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
        try {
            const services = await prisma.service.update({
                where: { id: Number(req.params.id) },
                data: req.body,
            });

            res.status(201).json(services);
        } catch (error) {
            res.status(404).json({ message: "Сервис не найден" });
        }
    },
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
        try {
            await prisma.service.delete({
                where: { id: Number(req.params.id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: "Сервис не найден" });
        }
    },
);

export default router;
