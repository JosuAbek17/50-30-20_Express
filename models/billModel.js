import mongoose from "mongoose";

const billSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    billType: String,
    billText: String,
    amount: Number,
    date: String,
  },
  {
    versionKey: false,
  }
);

export const Bill = mongoose.model("Bill", billSchema);
