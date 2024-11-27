import * as contactServices from '../services/contacts.js'
import createHttpError from 'http-errors'
import path from 'node:path'
import { parsePaginationParams } from '../utils/parsePaginationParams.js'
import { parseSortParams } from '../utils/parseSortParams.js'
import mongoose from 'mongoose'
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js'
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js'
import { env } from '../utils/env.js'
const enableCloudinary = env('ENABLE_CLOUDINARY')
 export const getAllContactsController = async (req, res) => {
    const {page, perPage} = parsePaginationParams(req.query)
    const {sortBy, sortOrder} = parseSortParams(req.query)
    const {_id} = req.user;
    const data = await contactServices.getContacts({page, perPage, sortBy, sortOrder,_id})
    res.json({
       status: 200,
       message: "Successfully find contacts",
       data,
   })
}
export const getContactByIdController = async (req, res) => {
    const {id} = req.params;
    const {_id} = req.user;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createHttpError(404, 'Contact not found');
      }
    const data =  await contactServices.getContactsById(id, _id)
if (!data) {
throw createHttpError(404,`Contact with id=${id} not found`)
}
    res.json({
       status: 200,
       message: "Successfully find contact",
       data,
   })
}
export const addContactController = async(req, res) => {
    // console.log(req.body)
    // console.log(req.file)
    const {id: userId} = req.user
    let photo = null;
    if(req.file) {
     if(enableCloudinary === 'true') {
      photo =  await saveFileToCloudinary(req.file, 'photos')
      console.log(photo)
       
     } else  {
        await saveFileToUploadDir(req.file)
        photo = path.join(req.file.filename)
    }
    } 
    
    const contact = await contactServices.createContact({...req.body,photo, userId});

    res.status(201).json({
        status: 201,
        message: 'Succsessfully created a contact',
        data: contact,
    })

}
export const patchContactController = async (req,res,next) => {
const {id} = req.params;
const {_id} = req.user

let photo = null;
    if(req.file) {
     if(enableCloudinary === 'true') {
      photo =  await saveFileToCloudinary(req.file, 'photos')
     } else  {
        await saveFileToUploadDir(req.file)
        photo = path.join(req.file.filename)
    }
    } 
const data = await contactServices.updateContact(id,{...req.body,photo}, _id)
if(!data) {
    next(createHttpError(404, `Contact with id=${id} not found`))
    return
}
res.json({
	status: 200,
	message: "Successfully patched a contact!",
	data: data
	// оновлені дані контакту
})
}
export const deleteContactController = async (req,res) => {
    const {id} = req.params;
    const {_id} = req.user
    const data = await contactServices.deleteContact(id,_id);
    if(!data) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.status(204).send();
}
