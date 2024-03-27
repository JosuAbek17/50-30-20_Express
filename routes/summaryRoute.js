import express from "express";
import { getSummary } from "../controllers/summaryController.js";
const router = express.Router();

router.get('/', getSummary);

export const summaryRoute = router;
