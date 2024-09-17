import { Router } from 'express'
import authController from '../../controllers/auth/authController.js';
const authRouter = Router();

authRouter.post("/register", authController.registerUser)
authRouter.post("/login", authController.loginUser)


export default authRouter;