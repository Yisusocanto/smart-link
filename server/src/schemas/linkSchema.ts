import { Schema } from "mongoose";
import { ILink } from "../types/ILink.js";

export const linkSchhema = new Schema<ILink>(
  {
    originalURL: {
      type: String,
      required: true,
      trim: true,
    },
    alias: {
      type: String,
      required: true,
      trim: true,
    },
    clickCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
