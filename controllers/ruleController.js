import { User } from "../models/userModel.js";

export const getRule = async (req, res) => {
  try {
    const userId = req.headers.userid;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.rule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRule = async (req, res) => {
  try {
    const { rule } = req.body;
    const userId = req.headers.userid;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.rule = rule;
    await user.save();
    res.status(200).json(user.rule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
