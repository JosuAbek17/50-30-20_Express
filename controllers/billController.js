import { User } from "../models/userModel.js";
import { getMonthExpenses } from "./salaryController.js";

export const createBill = async (req, res) => {
  try {
    const { bill } = req.body;
    const userId = req.headers.userid;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    addBillToMonth(user, bill);
    await user.save();
    res.status(200).json({ message: "Bill created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBill = async (req, res) => {
  try {
    const { bill } = req.body;
    const userId = req.headers.userid;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const billFound = removeBillFromUser(user, bill._id);
    if (!billFound) {
      return res.status(404).json({ message: "Bill not found" });
    }

    addBillToMonth(user, bill);
    await user.save();
    return res.status(200).json({ message: "Bill updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const { id } = req.query;
    const userId = req.headers.userid;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const billFound = removeBillFromUser(user, id);
    if (!billFound) {
      return res.status(404).json({ message: "Bill not found" });
    }

    await user.save();
    return res.status(200).json({ message: "Bill removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function getMonthFromDate(dateString) {
  const [day, month, year] = dateString.split("/");
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleString("es-ES", { month: "long" });
}

function createNewExpense(month, bill) {
  return {
    date: { month: month, year: new Date().getFullYear() },
    bills: [bill],
  };
}

function addBillToMonth(user, bill) {
  const month = getMonthFromDate(bill.date);
  let monthExpenses = getMonthExpenses(user.expenses, month);

  if (monthExpenses) {
    monthExpenses.bills.push(bill);
  } else {
    user.expenses.push(createNewExpense(month, bill));
  }
}

function removeBillFromUser(user, billId) {
  for (const expense of user.expenses) {
    const billIndex = expense.bills.findIndex((b) => b._id.toString() === billId);
    if (billIndex !== -1) {
      expense.bills.splice(billIndex, 1);
      return true;
    }
  }
  return false;
}

export function getCurrentMonthBills(bills) {
  const currentMonth = new Date().getMonth() + 1;
  return bills.filter(
    (bill) => getDateOfBill(bill) === currentMonth.toString()
  );
}

function getDateOfBill(bill) {
  return bill.date.split("/")[1];
}

export function sortBills(bills) {
  return bills.sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
}
