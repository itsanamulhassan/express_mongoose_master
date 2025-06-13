import express, { Request, Response } from "express";
import client from "../../config/mongodb";
import { ObjectId } from "mongodb";
export const todoRouter = express.Router();

todoRouter.post("/create-todo", async (req: Request, res: Response) => {
  const db = await client.db("todoAppDB");
  const collection = await db.collection("todos").insertOne(req.body);
  res.send({
    message: "Todo created successfully",
    data: collection,
  });
});

todoRouter.get("/all-todos", async (_, res: Response) => {
  const db = await client.db("todoAppDB");
  const collection = await db.collection("todos");

  const cursor = collection.find({});
  const todos = await cursor.toArray();

  res.send({
    message: "All todos fetched successfully",
    data: todos,
  });
});

todoRouter.get("/single-todo/:id", async (req: Request, res: Response) => {
  const db = await client.db("todoAppDB");
  const collection = await db.collection("todos");

  const cursor = await collection.findOne({ _id: new ObjectId(req.params.id) });

  res.send({
    message: "Single todo fetched successfully",
    data: cursor,
  });
});

todoRouter.delete("/delete-todo/:id", async (req: Request, res: Response) => {
  const db = await client.db("todoAppDB");
  const collection = await db.collection("todos");

  const cursor = await collection.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.send({
    message: "Todo deleted successfully",
    data: cursor,
  });
});
todoRouter.put("/update-todo/:id", async (req: Request, res: Response) => {
  const db = await client.db("todoAppDB");
  const collection = await db.collection("todos");
  const updateData = req.body;

  const cursor = await collection.updateOne(
    {
      _id: new ObjectId(req.params.id),
    },
    { $set: updateData },
    { upsert: true }
  );
  res.send({
    message: "Todo updated successfully",
    data: cursor,
  });
});
