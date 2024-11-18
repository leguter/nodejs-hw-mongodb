import bcrypt from "bcrypt"
import UserCollection  from "../models/modelSchema.js";
import createHttpError from "http-errors";
export const registerUser = async( payload) => {
    const email = UserCollection.findOne({email: payload.email})
    if (email) throw createHttpError(409,"Email in use")
        // problem with email
    const encryptedPassword = await  bcrypt.hash(payload.password,10 )
return await UserCollection.create({...payload, password: encryptedPassword})
}