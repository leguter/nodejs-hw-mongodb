import { Router } from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper.js"
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import validateBody from "../utils/validateBody.js";
import { loginUserController, logoutUserController, refreshSessionController, registerUserController } from "../controllers/auth.js";
const router = Router()
router.post(
    '/register',validateBody(registerUserSchema),ctrlWrapper(registerUserController)
)
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController))
router.post('/refresh', ctrlWrapper(refreshSessionController))
router.post('/logout', ctrlWrapper(logoutUserController))
export default router;