import { IUserModel, User } from "../models/User";

export const loginService = async (email: string): Promise<IUserModel | null> =>
  User.findOne({ email: email });

export const verifyIdUser = async (id: string) => User.findOne({ _id: id });
