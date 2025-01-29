import { User } from "../models/userModel.js";

export const setSalary = async (req, res) => {
  try {
    const { salary } = req.body;
    const userId = req.headers.userid;
    await User.findByIdAndUpdate(userId, { $set: { salary: salary } });
    res.status(200).json({message: "Salary updated"});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getSalary = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const user = await User.findById(userId);
    res.status(200).json({ salary: user.salary ?? null });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
