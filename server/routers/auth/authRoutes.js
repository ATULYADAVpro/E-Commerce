import { Router } from 'express'
import authController from '../../controllers/auth/authController.js';
import authMiddleware from '../../middleware/auth/authMiddleware.js';
const authRouter = Router();

authRouter.post("/register", authController.registerUser)
authRouter.post("/login", authController.loginUser)
authRouter.post("/logout", authController.loginOutUser)
authRouter.get("/check-auth", authMiddleware.auth,authController.checkUser)

export default authRouter;