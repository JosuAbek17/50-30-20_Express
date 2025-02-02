import mongoose from "mongoose";
import { Bill } from "./billModel.js";

const expenseSchema = mongoose.Schema(
  {
    date: { year: String, month: String },
    salary: Number,
    bills: [Bill.schema],
  },
  {
    versionKey: false,
  }
);

export const Expense = mongoose.model("Expense", expenseSchema);
