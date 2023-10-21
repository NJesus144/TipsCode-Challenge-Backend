import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

export interface IUserModel extends Document {
  userName: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUserModel>({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User: Model<IUserModel> = mongoose.model<IUserModel>(
  "User",
  UserSchema
);
