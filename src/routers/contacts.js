
import { Router } from "express";
// import * as contactServices from '../services/contacts.js'
const router = Router();
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAllContactsController, getContactByIdController,addContactController, patchContactController, deleteContactController} from "../controllers/contacts.js";
   
router.get('/contacts', ctrlWrapper(getAllContactsController))
router.get('/contacts/:id', ctrlWrapper(getContactByIdController))
router.post('/contacts',ctrlWrapper(addContactController))
router.patch('/contacts/:id', ctrlWrapper(patchContactController))
router.delete('/contacts/:id', ctrlWrapper(deleteContactController))
export default router;