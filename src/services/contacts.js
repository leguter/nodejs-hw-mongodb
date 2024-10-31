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