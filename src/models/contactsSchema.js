import { Schema, model } from 'mongoose';
import { typeList } from '../constants/movies.js';
const contactsSchema = new Schema({
    
    
        name:{type:String, required: true,},

    phoneNumber: { type: String, required:true},

    email: {type:String},

    isFavorite: {
        type: Boolean, default: false
    },

    contactType: {
        type:String, enum:typeList,
        default: 'personal',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    }
}, 
{
    versionKey: false, timestamps: true
}
);
const ContactsCollection = model('contacts', contactsSchema)
export default ContactsCollection