

import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: {type:String, required: true},
    email: {type: String, required: true, unique: true},
    password:  {type:String, required: true},
    createdAt: {type: Date},
    updatedAt: {type: Date},
},
{timestamps: true, versionKey: false})
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}
const UserCollection = model('users', userSchema)
export default UserCollection;