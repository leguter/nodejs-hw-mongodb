import ContactsCollection from "../models/contactsSchema.js";
 export const getContacts = async ()=> {
   const contacts = await ContactsCollection.find();
    return contacts;
}
export const getContactsById = async (id) => {
    const contact = await ContactsCollection.findById(id) 
    return contact;
};