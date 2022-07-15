import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoute);

app.listen(process.env.PORT);
