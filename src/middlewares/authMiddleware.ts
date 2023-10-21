import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyIdUser } from "../services/authService";

type JwtPayload = {
  id: string;
};

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(
      token,
      process.env.SECRET_JWT ?? ""
    ) as JwtPayload;

    const user = await verifyIdUser(id);

    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).send({ message: "Unauthorized" });
  }
}
