import express from "express";
import { createBill, updateBill, deleteBill } from "../controllers/billController.js";
const router = express.Router();

router.post('/', createBill);
router.patch('/', updateBill);
router.delete('/', deleteBill);

export const billRoute = router;
