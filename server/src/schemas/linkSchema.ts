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
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    user: {
      // Ahora coincide con el tipo string de la interfaz ILink
      type: String,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
