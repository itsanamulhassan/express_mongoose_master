import express, { Request, Response } from "express";
import Note from "../models/notes.model";
export const notesRouter = express.Router();
notesRouter.post("/create-note", async (req: Request, res: Response) => {
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

notesRouter.get("/all-notes", async (req: Request, res: Response) => {
  const notes = await Note.find({});
  res.status(200).json({
    success: true,
    message: "Notes has been retrieved successfully",
    notes,
  });
});
notesRouter.get("/single-note/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  //   const note = await Note.findById(noteId);
  const note = await Note.findOne({ _id: noteId });
  res.status(200).json({
    success: true,
    message: "Note has been retrieved successfully",
    note,
  });
});
notesRouter.put("/update-note/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const updateNote = req.body;
  //   const note = await Note.updateOne({ _id: noteId }, updateNote);
  const note = await Note.findByIdAndUpdate(noteId, updateNote, { new: true });
  res.status(200).json({
    success: true,
    message: "Note has been updated successfully",
    note,
  });
});
notesRouter.delete("/delete-note/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  //   await Note.deleteOne({ _id: noteId });
  await Note.findByIdAndDelete(noteId);
  res.status(200).json({
    success: true,
    message: "Note has been deleted successfully",
  });
});
