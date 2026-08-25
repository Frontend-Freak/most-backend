import express, { type Request, type Response } from "express";
import { PORT } from "./constants.js";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Main" });
});

app.listen(PORT, () => {
    console.log(`Сервер работает на ${PORT} порту`);
});
