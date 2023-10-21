import express, { Express, Request, Response } from "express";

import userRouter from './routes/userRoute'
import connectDatabase from "./database/mongoConnect";
import { config } from "dotenv";
import cors from "cors";

config();

const port = process.env.PORT || 8000;
const app: Express = express();
connectDatabase();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.use(cors());
app.use(express.json());
app.use('/', userRouter)

app.listen(port, () => console.log(`Listening on port ${port}!`));
