import { User } from "../models/userModel.js";

export const createBill = async (req, res) => {
  try {
    const { id, bill } = req.body;
    await User.findByIdAndUpdate(id, { $push: { bills: bill } });
    res.status(200).json(bill);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export function sortBills(bills) {
  return bills.sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
}
