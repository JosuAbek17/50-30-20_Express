import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

export const checkIfUserExist = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

export const createUser = async (email, password) => {
  const user = new User({
    email,
    password: bcrypt.hashSync(password, 10)
  });

  const response = await user.save();
  return response;
};
