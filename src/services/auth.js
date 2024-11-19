import bcrypt from "bcrypt"
import { randomBytes} from "crypto"
import UserCollection  from "../models/modelSchema.js";
import createHttpError from "http-errors";
import  SessionCollection from "../models/SessionSchema.js"
import { fifteen_minutes, one_day } from "../constants/auth.js";
export const registerUser = async( payload) => {
    const email = await UserCollection.findOne({email: payload.email})
    if (email) throw createHttpError(409,"Email in use")
        // problem with email
    const encryptedPassword = await  bcrypt.hash(payload.password,10 )
return await UserCollection.create({...payload, password: encryptedPassword})
}
export const loginUser = async (payload) => {
    const user = await UserCollection.findOne({email: payload.email})
    if (!user) throw createHttpError(404, "User not found");
    const isEqual = await bcrypt.compare(payload.password, user.password)
    if(!isEqual) throw createHttpError(401, "Unauthorized")
        await SessionCollection.deleteOne({userId: user._id})
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    return await SessionCollection.create({
        userId:user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + fifteen_minutes),
        refreshTokenValidUntil: new Date(Date.now() + one_day)
    })
}