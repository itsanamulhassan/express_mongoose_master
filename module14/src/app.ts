import express, { Application, Request, Response } from "express";
import { todoRouter } from "./app/todos/todos.routes";

// const filepath = path.join(__dirname, "../db/todos.json");

const app: Application = express();
app.use(express.json());

app.use("/todo", todoRouter);

export default app;
