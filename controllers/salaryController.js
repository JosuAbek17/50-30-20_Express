import { User } from "../models/userModel.js";

export const setSalary = async (req, res) => {
  try {
    const { salary, month } = req.body;
    const userId = req.headers.userid;

    if (!salary || !month || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const monthExpenses = getMonthExpenses(user.expenses, month);
    if (monthExpenses) {
      monthExpenses.salary = salary;
    } else {
      user.expenses.push(createNewExpense(month, salary));
    }

    await user.save();
    res.status(200).json({ message: "Salary updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export function getMonthExpenses(expenses, month) {
  return expenses.find(
    (expense) => expense.date.month.toLowerCase() === month.toLowerCase()
  );
}

function createNewExpense(month, salary) {
  return {
    date: { month: month, year: new Date().getFullYear() },
    salary: salary,
  };
}

export const getSalary = async (req, res) => {
  try {
    const userId = req.headers.userid;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentMonth = new Date()
      .toLocaleString("es-ES", { month: "long" })
      .toLowerCase();
    const expenseFound = user.expenses.find(
      (expense) => expense.date.month.toLowerCase() === currentMonth
    );

    if (expenseFound) {
      res.status(200).json({ salary: expenseFound.salary });
    } else {
      res
        .status(404)
        .json({ message: "Salary not found for the current month" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
