import { User } from "../models/userModel.js";
import { sortBills, getCurrentMonthBills } from "./billController.js";

export const getSummary = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (user.bills.length > 0) {
      user.bills = getCurrentMonthBills(user.bills);
      user.bills = sortBills(user.bills);
    }
    res.status(200).json({ bills: user.bills, salary: user.salary });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
