import mongoose from "mongoose";
import { config } from "dotenv";

config();

const DB_URL = process.env["DB_URL"] ?? "";

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(DB_URL);
    console.log("connected...", connection.connection.db?.databaseName);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
