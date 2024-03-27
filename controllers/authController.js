import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { checkIfUserExist, createUser } from "./userController.js";

export function generateToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: "3000s" });
}

export function validateToken(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET);
}

export const refreshToken = (req, res) => {
  const token = generateToken({email: req.email});
  res.json({token: token});
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await checkIfUserExist(email);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = generateToken({ email: email });
        res.status(200).json({ user, token: token });
      } else {
        res
          .status(404)
          .json({ message: `Password doesn't match with email provided.` });
      }
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await checkIfUserExist(email);
    if (userExist)
      return res.status(409).json({ message: "This user already exist." });

    const userCreated = await createUser(email, password);
    if (userCreated) {
      const token = generateToken({ email: email });
      res.status(201).json({ user: userCreated, token: token });
    } else {
      res.status(400).json({ error: 'User cannot be created.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};