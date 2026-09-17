import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";

export default async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({ message: "Не авторизован" });
    }

    const token = auth.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Токен отсутствует" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded as { id: number; role: string };
        next();
    } catch (error) {
        res.status(401).json({ message: "Неверный токен" });
    }
}
