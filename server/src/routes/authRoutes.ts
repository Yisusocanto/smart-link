import { Router } from "express";
import { tokenRequired } from "../middleware/tokenRequired.js";
import { getMe, login, logout, signup } from "../controllers/authController.js";

export const authRouter: Router = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/me", tokenRequired, getMe);
