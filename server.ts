import express, { type Request, type Response } from "express";
import cors from "cors";
import { PORT } from "./constants.js";
import plansRouter from "./routes/plans.js";
import servicesRouter from "./routes/services.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    }),
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Main" });
});

app.use("/plans", plansRouter);

app.use("/services", servicesRouter);

app.listen(PORT, () => {
    console.log(`Сервер работает на ${PORT} порту`);
});
