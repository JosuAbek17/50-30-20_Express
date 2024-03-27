import express from "express";
import { getSalary, setSalary } from "../controllers/salaryController.js";
const router = express.Router();

router.get('/', getSalary);
router.post('/', setSalary);
router.put('/', setSalary);

export const salaryRoute = router;