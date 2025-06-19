import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
const app: Application = express();

app.use(express.json());

const noteSchema = new Schema({
  title: String,
  content: String,
});

const Note = model("Note", noteSchema);

app.post("/create-note", async (req: Request, res: Response) => {
  const note = new Note(req.body);
  await note.save();
  res.status(201).json({
    success: true,
    message: "Note has been created successfully",
    note,
  });
});

export default app;
