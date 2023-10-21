import { User } from "../models/User";
import { IUser } from "../interface/InterfaceUser";
import { IUserModel } from "../models/User";

export const createUserService = async (body: IUser): Promise<IUserModel> =>
  User.create(body);

export const findUserService = async (email: string): Promise<IUserModel | null> =>
  User.findOne({ email: email });
