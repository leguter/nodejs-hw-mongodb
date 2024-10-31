
import { Router } from "express";
import * as contactServices from '../services/contacts.js'
const router = Router();

   
router.get('/contacts', async(req,res)=> {
    const data = await contactServices.getContacts()
    res.json({
       status: 200,
       message: "Successfully find contacts",
       data: data,
   })
   })
 

router.get('/contacts/:id', async (req, res)=> {
    const {id} = req.params;
    const data =  await contactServices.getContactsById(id)
if (!data) {
 return   res.status(404).json({
       message: `Contact with ID=${id}, not found`,
   })
}
    res.json({
       status: 200,
       message: "Successfully find contact",
       data,
   })
   })
export default router;