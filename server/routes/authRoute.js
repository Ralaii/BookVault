import express from "express";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validations/auth.js";
import { loginController, logoutController, registerController } from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";

const authRoute = express.Router();

authRoute.post("/register", validate(registerSchema), registerController)
authRoute.post("/login", validate(loginSchema), loginController)

authRoute.post("logout", authenticate, logoutController);
//authRoute.get

export default authRoute;