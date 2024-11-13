import ContactsCollection from "../models/contactsSchema.js";
 export const getContacts = async ({page = 1, perPage = 10})=> {
    const skip = (page - 1) * perPage;
   const contacts = await ContactsCollection.find().skip(skip).limit(perPage);
   const totalItems = await ContactsCollection.countDocuments()
//    resolve totalItems
    return {
        contacts,
        totalItems
    }
}
export const getContactsById = async (id) => {
    const contact = await ContactsCollection.findById(id) 
    return contact;
};
export const createContact = async (payload)  => {
    const contact = await ContactsCollection.create(payload)
    return contact

}
export const updateContact = async ({id,payload, options={}}) => {
    const contact = await ContactsCollection.findOneAndUpdate({_id: id},payload,{...options, new:true, includeResultMetadata: true});
   if(!contact || !contact.value) return null
   else {
    return  contact.value
   }
 
 
}
export const deleteContact = async (filter)=> {
const contact =  await ContactsCollection.findOneAndDelete({_id:filter})
return contact
    
}