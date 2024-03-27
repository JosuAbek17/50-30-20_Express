import mongoose from "mongoose";

const summarySchema = mongoose.Schema([
  {
    type: {
      type: String,
    },
    money: {
      type: Number,
    },
    date: {
      type: Date,
    },
  },
]);

export const Summary = mongoose.model("Summary", summarySchema);
