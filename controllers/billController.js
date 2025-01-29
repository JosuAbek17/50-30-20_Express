import { User } from "../models/userModel.js";

export const createBill = async (req, res) => {
  try {
    const { bill } = req.body;
    const userId = req.headers.userid;

    await User.findByIdAndUpdate(userId, { $push: { bills: bill } });
    res.status(200).json({message: "Bill created"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBill = async (req, res) => {
  try {
    const { bill } = req.body;
    const userId = req.headers.userid;
    const user = await User.findById(userId);
    if (user) {
      const billFound = user.bills.id(bill._id);
      if (billFound) {
        billFound.amount = bill.amount;
        billFound.billText = bill.billText;
        billFound.billType = bill.billType;
        billFound.date = bill.date;
        await user.save();
        res.status(200).json({ message: "Success" });
      } else {
        res.status(404).json({ message: "Bill not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const { id } = req.query;
    const userId = req.headers.userid;
    const user = await User.findById(userId);
    if (user) {
      const bill = user.bills.id(id);
      if (bill) {
        user.bills.pull(id);
        await user.save();
        res.status(200).json({ message: "Bill removed" });
      } else {
        res.status(404).json({ message: "Bill not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
