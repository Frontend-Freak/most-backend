import { Router, type Request, type Response } from "express";
import prisma from "../prisma.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res
                .status(409)
                .json({ message: "Пользователь с таким email уже существует" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: "Регистрация прошла успешно" });
    } catch (error) {
        res.status(404).json({ message: "Ошибка регистрации" });
    }
});

export default router;
