import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createUserService, findUserService } from "../services/userService";
import { loginService } from "../services/authService";

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { userName, email, password } = req.body;

    console.log(userName, email, password);

    if (!userName || !email || !password) {
      res.status(400).send({
        message: "submit all fields for registration",
      });
      return;
    }

    const userExists = await findUserService(email);

    if (userExists) {
      res.status(400).send({ message: "This email already exists" });
      return;
    }

    const user = await createUserService(req.body);

    if (!user) {
      res.status(400).send({
        message: "Error creating User",
      });
      return;
    }

    res.status(201).send({
      message: "User created successfully!",
      user: {
        id: user._id,
        userName,
        email,
        password,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const user = await loginService(email);

    if (!user) {
      res.status(400).send({ message: "Invalid email or password" });
      return;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      res.status(400).send({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT ?? "", {
      expiresIn: "8h",
    });

    res.status(200).send({
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function salesChart(req: Request, res: Response) {
  res.status(200).send(req.user);
}
