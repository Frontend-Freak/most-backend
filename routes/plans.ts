import { Router, type Request, type Response } from "express";
import prisma from "../prisma.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const plans = await prisma.plan.findMany();

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

router.post("/", async (req: Request, res: Response) => {
    try {
        const plan = await prisma.plan.create({ data: req.body });
        res.status(201).json(plan);
    } catch (error) {
        res.status(404).json({message: "Сервис не найден"})
    }
});

router.patch("/:id", async (req: Request, res: Response) => {
    try {
        const plan = await prisma.plan.update({
            where: { id: Number(req.params.id) },
            data: req.body,
        });
        res.status(200).json(plan);
    } catch (error) {
        res.status(404).json({ message: "Ошибка при обновлении" });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        await prisma.plan.delete({
            where: { id: Number(req.params.id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: "План не найден" });
    }
});

export default router;
