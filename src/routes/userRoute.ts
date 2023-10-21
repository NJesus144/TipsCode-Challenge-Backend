import { Router } from "express";
import * as userController from "../controller/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

router.use(authMiddleware)

router.get("/sales", userController.salesChart);

export default router;
