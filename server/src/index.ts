import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/connectDatabase.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRouter } from "./routes/authRoutes.js";
import { linkRouter } from "./routes/linkRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env["PORT"] || 3001;

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.get("/health", (_req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRouter);
app.use("/", linkRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Server running on port ${PORT}`);
});
