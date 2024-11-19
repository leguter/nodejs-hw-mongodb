import { Router } from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper.js"
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import validateBody from "../utils/validateBody.js";
import { loginUserController, registerUserController } from "../controllers/auth.js";
const router = Router()
router.post(
    '/register',validateBody(registerUserSchema),ctrlWrapper(registerUserController)
)
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController))
export default router;