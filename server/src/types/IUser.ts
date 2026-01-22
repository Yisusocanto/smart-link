import { Date, Types, Document } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  name?: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
