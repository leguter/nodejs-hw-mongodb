import ContactsCollection from "../models/contactsSchema.js";
 export const getContacts = async ()=> {
   const contacts = await ContactsCollection.find();
    return contacts;
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
 return {
    data: contact.value,
    isNew: Boolean(contact.lastErrorObject.upserted)
 }
}
export const deleteContact = async (filter)=> {
const contact =  await ContactsCollection.findOneAndDelete({_id:filter})
return contact
    
}