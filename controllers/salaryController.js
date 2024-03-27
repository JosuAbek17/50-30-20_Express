import { User } from "../models/userModel.js";

export const setSalary = async (req, res) => {
  try {
    const { id, salary } = req.body;
    await User.findByIdAndUpdate(id, { $set: { salary: salary } });
    res.status(200).json(salary);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getSalary = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    res.status(200).json({ salary: user.salary ?? null });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
