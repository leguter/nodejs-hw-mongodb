import { Router } from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper.js"
import { registerUserSchema } from "../validation/auth.js";
import validateBody from "../utils/validateBody.js";
import { registerUserController } from "../controllers/auth.js";
const router = Router()
router.post(
    '/register',validateBody(registerUserSchema),ctrlWrapper(registerUserController)
)
export default router;