import express from 'express';
import { signin } from '../controllers/authController.js';
const router = express.Router();

router.post('/', signin);

export const signinRoute = router;
