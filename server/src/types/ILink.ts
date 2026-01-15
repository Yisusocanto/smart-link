import { Document, Types } from "mongoose";

export interface ILink extends Document {
  originalURL: string;
  alias: string;
  clickCount: number;
  active: boolean;
  user: Types.ObjectId;
}
