
import { Router } from "express";
// import * as contactServices from '../services/contacts.js'
const router = Router();
import validateBody from "../utils/validateBody.js";
import { validateAddSchema, validateUpdateSchema } from "../validation/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAllContactsController, getContactByIdController,addContactController, patchContactController, deleteContactController} from "../controllers/contacts.js";
   import { isValidId } from "../middlewares/isValidId.js";
router.get('/contacts', ctrlWrapper(getAllContactsController))
router.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController))
router.post('/contacts', validateBody(validateAddSchema),ctrlWrapper(addContactController))
router.patch('/contacts/:id',isValidId,validateBody(validateUpdateSchema), ctrlWrapper(patchContactController))
router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController))
export default router;