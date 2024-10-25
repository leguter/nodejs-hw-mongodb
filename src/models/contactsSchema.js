import { Schema, model } from 'mongoose';
const contactsSchema = new Schema({
    
        name:{type:String, required: true,}
},
{
    phoneNumber: { type: String, required:true},
   
},
{
    email: {type:String}
},
{
    isFavorite: {
        type: Boolean, default: false
    }
},
{
    contactType: {
        type:String, enum:['work', 'home', 'personal'],
        default: 'personal',
        required: true
    }
}, 
{
    timestamps: true
}
);
const ContactsCollection = model('Contacts', contactsSchema)
export default ContactsCollection