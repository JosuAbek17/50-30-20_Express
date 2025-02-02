import { User } from "../models/userModel.js";
import { sortBills } from "./billController.js";

export const getSummary = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { month } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const selectedMonth = getSelectedMonth(month);
    const monthExpenses = getMonthExpenses(user.expenses, selectedMonth);

    if (!monthExpenses) {
      return res.status(204).send();
    }

    monthExpenses.bills = sortBills(monthExpenses.bills);

    res.status(200).json({ expenses: monthExpenses });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

function getSelectedMonth(month) {
  if (month) {
    return month.toLowerCase();
  }
  return new Date().toLocaleString("es-ES", { month: "long" }).toLowerCase();
}

function getMonthExpenses(expenses, month) {
  return expenses.find((expense) => expense.date.month.toLowerCase() === month);
}
