import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { billRoute } from "./routes/billRoute.js";
import { summaryRoute } from "./routes/summaryRoute.js";
import { salaryRoute } from "./routes/salaryRoute.js";
import { loginRoute } from "./routes/loginRoute.js";
import { signinRoute } from "./routes/signinRoute.js";
import { refreshRoute } from './routes/refreshRoute.js';
import { validateToken } from "./controllers/authController.js";

dotenv.config();
const app = express();
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;
const freeeTokenEndpoints = ["/login", "/signin"];
const port = process.env.PORT || 3000;

mongoose
  .connect(MONGO_CONNECTION)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(port, () => {
      console.log(`server listening at ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

app.use((req, res, next) => {
  if (!freeeTokenEndpoints.includes(req.url) && req.method !== "OPTIONS") {
    let token = req.headers.authorization;
    if (token) {
      token = token.replace(/^Bearer\s+/, "");
      try {
        const tokenValidated = validateToken(token);
        if (tokenValidated) {
          req.email = tokenValidated.email;
          next();
        }
      } catch (error) {
        return res.status(401).json({ messaage: error });
      }
    } else {
      return res.status(401).json({ messaage: "Token is missing" });
    }
  } else next();
});
app.use(cors());
app.disable("x-powered-by");
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/signin", signinRoute);
app.use("/login", loginRoute);
app.use("/bill", billRoute);
app.use("/summary", summaryRoute);
app.use("/salary", salaryRoute);
app.use("/refresh", refreshRoute);
