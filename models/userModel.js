import mongoose from "mongoose";
import { Expense } from "./expenseModel.js";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "The email is required"],
    },
    password: {
      type: String,
      required: [true, "The password is required"],
    },
    expenses: [Expense.schema]
  },
  {
    versionKey: false,
  }
);

userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

export const User = mongoose.model("User", userSchema);
