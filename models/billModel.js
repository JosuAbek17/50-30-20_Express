import mongoose from "mongoose";

const billSchema = mongoose.Schema(
  {
      billType: String,
      billText: String,
      amount: Number,
      date: String
  },
  {
    versionKey: false,
    _id: false
  }
);

export const Bill = mongoose.model("Bill", billSchema);
