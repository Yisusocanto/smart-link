import { Date, Types, Document } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
