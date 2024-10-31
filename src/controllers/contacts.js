import * as contactServices from '../services/contacts.js'
import createHttpError from 'http-errors'
 export const getAllContactsController = async (req, res) => {
    const data = await contactServices.getContacts()
    res.json({
       status: 200,
       message: "Successfully find contacts",
       data: data,
   })
}
export const getContactByIdController = async (req, res) => {
    const {id} = req.params;
    const data =  await contactServices.getContactsById(id)
if (!data) {
throw createHttpError(404,`Contact with id=${id}not found`)
}
    res.json({
       status: 200,
       message: "Successfully find contact",
       data,
   })
}
export const addContactController = async(req, res) => {
    const contact = await contactServices.createContact(req.body);

    res.status(201).json({
        status: 201,
        message: 'Succsessfully created a contact',
        data: contact,
    })

}