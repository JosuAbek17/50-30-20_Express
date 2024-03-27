import mongoose from "mongoose";
import { Bill } from "./billModel.js";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "The email is required"],
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  bills: [Bill.schema],
  salary: Number
},{
  versionKey: false
});

userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

export const User = mongoose.model("User", userSchema);
