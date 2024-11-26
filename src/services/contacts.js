import { SORT_ORDER } from "../constants/movies.js";
import ContactsCollection from "../models/contactsSchema.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
 export const getContacts = async ({page = 1, perPage = 10, sortBy = "_id", sortOrder = SORT_ORDER.ASC, _id})=> {
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactsCollection.find();
    const totalItems= await ContactsCollection.find({userId:_id}).merge(contactsQuery).countDocuments()
//    const totalItems =   await ContactsCollection.find().countDocuments()
   const contacts = await ContactsCollection.find({userId:_id}).skip(skip).limit(perPage).sort({[sortBy]:sortOrder}).exec();
   const paginationData = calculatePaginationData({page,perPage,totalItems})
//    resolve totalItems
    return {
        contacts,
        ...paginationData
    }
}
export const getContactsById = async (id,_id) => {
    const contact = await ContactsCollection.findOne({ _id: id,userId:_id}) 
    return contact;
};
export const createContact = async (payload)  => {
    const contact = await ContactsCollection.create(payload)
    return contact

}
export const updateContact = async (id,payload,_id ,options={}) => {
    const contact = await ContactsCollection.findOneAndUpdate({_id: id, userId:_id},payload,{...options, new:true, includeResultMetadata: true});
   if(!contact || !contact.value) return null
   else {
    return  contact.value
   }
 
 
}
export const deleteContact = async (contactId, _id)=> {
const contact =  await ContactsCollection.findOneAndDelete({_id:contactId,userId:_id})
return contact
    
}