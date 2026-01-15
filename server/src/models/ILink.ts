import mongoose from "mongoose";
import { linkSchhema } from "../schemas/linkSchema.js";

export const Link = mongoose.model("Link", linkSchhema);
