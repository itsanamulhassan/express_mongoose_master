import express, { Request, Response } from "express";
import User from "../models/user.model";
export const userRouter = express.Router();
userRouter.post("/create-user", async (req: Request, res: Response) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    message: "User has been created successfully",
    user,
  });
});

userRouter.get("/all-user", async (req: Request, res: Response) => {
  const users = await User.find({}, { password: false });
  res.status(200).json({
    success: true,
    message: "Users has been retrieved successfully",
    users,
  });
});
userRouter.get("/single-user/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  res.status(200).json({
    success: true,
    message: "User has been retrieved successfully",
    user,
  });
});
userRouter.put("/update-user/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const updateUser = req.body;
  const user = await User.findByIdAndUpdate(userId, updateUser, { new: true });
  res.status(200).json({
    success: true,
    message: "User has been updated successfully",
    user,
  });
});
userRouter.delete("/delete-user/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  res.status(200).json({
    success: true,
    message: "User has been deleted successfully",
  });
});
