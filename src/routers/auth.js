import { Router } from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper.js"
import { loginUserSchema, registerUserSchema, resetEmailSchema, resetPasswordSchema } from "../validation/auth.js";
import validateBody from "../utils/validateBody.js";
import { loginUserController, logoutUserController, refreshSessionController, registerUserController, resetEmailController, resetPasswordController } from "../controllers/auth.js";
import { requestResetEmail } from "../services/auth.js";
const router = Router()
router.post(
    '/register',validateBody(registerUserSchema),ctrlWrapper(registerUserController)
)
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController))
router.post('/refresh', ctrlWrapper(refreshSessionController))
router.post('/logout', ctrlWrapper(logoutUserController))
router.post('/request-reset-email', validateBody(resetEmailSchema), ctrlWrapper(resetEmailController))
router.post('/reset-password', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController))
export default router;