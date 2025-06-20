import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import validator from "validator";

const userSchema = new Schema<IUser>({
  name: {
    firstName: {
      minlength: [6, "Must be at least 5, got {VALUE}"],
      type: String,
      required: true,
      trim: true,
      maxLength: [50, "Must be at most 50, got {VALUE}"],
    },
    lastName: {
      type: String,
      trim: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Must be unique"],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email {VALUE}"],
    // validate: {
    //   validator: function (value) {
    //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    //   },
    //   message: function ({ value }) {
    //     return `Email ${value} is not valid!`;
    //   },
    // },
  },
  password: { type: String, required: true },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 60,
  },
  role: {
    type: String,
    enum: {
      values: ["USER", "ADMIN", "SUPER-ADMIN"],
      message: "Role is not valid! got {VALUE}",
    },
    default: "USER",
    uppercase: true,
  },
});

const User = model<IUser>("User", userSchema);
export default User;
