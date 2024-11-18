
import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: {type:String, required: true},
    email: {type: String, required: true, unique: true, email},
    password:  {type:String, required: true},
    createdAt: {},
    updatedAt: {},
},
{timestamps: true, versionKey: false})
const UserCollection = model('users', userSchema)
export default UserCollection;