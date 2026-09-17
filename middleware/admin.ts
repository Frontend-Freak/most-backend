import type { Request, Response, NextFunction } from "express";

export default async function adminMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (!req.user) {
        return res.status(403).json({ message: "Не авторизован" });
    }
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Доступ запрещен" });
    }
    next();
}
