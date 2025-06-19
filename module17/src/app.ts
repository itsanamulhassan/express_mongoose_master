import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
const app: Application = express();

app.use(express.json());

const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["personal", "work", "study", "other"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "gray" },
  },
});

const Note = model("Note", noteSchema);

app.post("/notes/create-note", async (req: Request, res: Response) => {
  //Approach -1
  //   const note = new Note(req.body);
  //   await note.save();

  // Approach -2
  const note = await Note.create(req.body);

  res.status(201).json({
    success: true,
    message: "Note has been created successfully",
    note,
  });
});

export default app;
