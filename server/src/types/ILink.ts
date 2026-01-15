import { Document } from "mongoose";

export interface ILink extends Document {
  originalURL: string;
  alias: string;
  clickCount: number;
  activate: boolean;
}
