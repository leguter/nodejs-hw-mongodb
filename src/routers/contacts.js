
import { Router } from "express";
// import * as contactServices from '../services/contacts.js'
const router = Router();
import {authenticate} from '../middlewares/authenticate.js' 
import validateBody from "../utils/validateBody.js";
import { validateAddSchema, validateUpdateSchema } from "../validation/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAllContactsController, getContactByIdController,addContactController, patchContactController, deleteContactController} from "../controllers/contacts.js";
   import { isValidId } from "../middlewares/isValidId.js";
   import { upload } from "../middlewares/upload.js";
   router.use(authenticate)
router.get('/', ctrlWrapper(getAllContactsController))
router.get('/:id', isValidId, ctrlWrapper(getContactByIdController))
router.post('/', upload.single('photo'),validateBody(validateAddSchema),ctrlWrapper(addContactController))
router.patch('/:id',upload.single('photo'),isValidId,validateBody(validateUpdateSchema), ctrlWrapper(patchContactController))
router.delete('/:id', isValidId, ctrlWrapper(deleteContactController))
export default router;