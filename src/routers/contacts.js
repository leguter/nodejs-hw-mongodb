
import { Router } from "express";
// import * as contactServices from '../services/contacts.js'
const router = Router();
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAllContactsController, getContactByIdController,addContactController} from "../controllers/contacts.js";
   
router.get('/contacts', ctrlWrapper(getAllContactsController))
router.get('/contacts/:id', ctrlWrapper(getContactByIdController))
router.post('/contacts',ctrlWrapper(addContactController))
export default router;