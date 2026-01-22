import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/connectDatabase.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { linkRouter } from "./routes/linkRoutes.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

dotenv.config();

const app = express();
const PORT = process.env["PORT"] || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL ?? "";

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  }),
);

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("tiny"));
app.use("/api/auth", toNodeHandler(auth));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.send("Hello World");
});

app.use("/", linkRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Server running on port ${PORT}`);
});
