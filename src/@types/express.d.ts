import { IUser } from "../interface/InterfaceUser";

declare global {
  namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}
