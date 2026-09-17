import { Router, type Request, type Response } from "express";
import prisma from "../prisma.js";
import adminMiddleware from "../middleware/admin.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const { serviceId } = req.query;

    const plans = await prisma.plan.findMany({
        where: serviceId ? { serviceId: Number(serviceId) } : {},
    });

    res.status(200).json(plans);
});

router.get("/:id", async (req: Request, res: Response) => {
    const plan = await prisma.plan.findUnique({
        where: { id: Number(req.params.id) },
    });

    if (!plan) {
        return res.status(404).json({ message: "План не найден" });
    }

    res.status(200).json(plan);
});

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
        try {
            const plan = await prisma.plan.create({ data: req.body });
            res.status(201).json(plan);
        } catch (error) {
            res.status(404).json({ message: "Сервис не найден" });
        }
    },
);

router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
        try {
            const plan = await prisma.plan.update({
                where: { id: Number(req.params.id) },
                data: req.body,
            });
            res.status(200).json(plan);
        } catch (error) {
            res.status(404).json({ message: "Ошибка при обновлении" });
        }
    },
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
        try {
            await prisma.plan.delete({
                where: { id: Number(req.params.id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: "План не найден" });
        }
    },
);

export default router;
