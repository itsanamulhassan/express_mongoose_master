import express, { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";

const filepath = path.join(__dirname, "../db/todos.json");

export const todosRouter = express.Router();

const app: Application = express();
app.use(express.json());
app.use("/", todosRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to ToDos App ");
});

todosRouter.get("/todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filepath, "utf-8");
  res.json({
    message: "Fetched todos",
    data,
  });
});

app.post("/create-todo", (req: Request, res: Response) => {
  console.log(req.body);
});
app.get("/todo/:id", (req: Request, res: Response) => {
  console.log("query", req.query);
  console.log("param", req.params);
  // console.log(req.body);
});

export default app;
