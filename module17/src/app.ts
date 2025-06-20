import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { notesRouter } from "./app/controllers/notes.controller";
import { userRouter } from "./app/controllers/user.controller";
const app: Application = express();

app.use(express.json());

app.use("/notes", notesRouter);
app.use("/user", userRouter);

app.get("/", (_, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to our note app server",
  });
});

export default app;
