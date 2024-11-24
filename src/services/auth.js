import bcrypt from "bcrypt"
import { randomBytes} from "crypto"
import UserCollection  from "../models/modelSchema.js";
import createHttpError from "http-errors";
import  SessionCollection from "../models/SessionSchema.js"
import { fifteen_minutes, one_day } from "../constants/auth.js";
import jwt from 'jsonwebtoken'
import { SMTP, TEMPLATES_DIR } from "../constants/index.js";
import { env } from "../utils/env.js";
import {sendMail} from '../utils/sendMail.js';
import path from "path";
import fs from "node:fs/promises"
import handlebars from 'handlebars'
const createSession = ()=> {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + fifteen_minutes),
        refreshTokenValidUntil: new Date(Date.now() + one_day)
    }
 
}
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
    const newSession = createSession()
    return await SessionCollection.create({
        userId:user._id,
       ...newSession
    })
}
export const refreshUser = async({sessionId,refreshToken})=> {
    const session = await SessionCollection.findOne({_id: sessionId, refreshToken})
    if(!session) throw createHttpError(401, "Session not found")
        if(Date.now() > session.refreshTokenValidUntil)  throw createHttpError(401,"Access token expired")
            await SessionCollection.deleteOne({_id: session._id})
        const newSession = createSession()
        return await SessionCollection.create({
            userId:session.userId,
           ...newSession
        })
}
export const logoutUser = async ({sessionId}) => {
    await SessionCollection.deleteOne({_id:sessionId})
}

export const findSession = filter => SessionCollection.findOne(filter)
export const findUser = filter => UserCollection.findOne(filter);

export const requestResetEmail = async (email) => {
    const request = await UserCollection.findOne({email})
    if(!request) throw createHttpError(404, "user not found")
        const resetToken = jwt.sign({
    sub: request._id,
    email
    },
    env('JWT_SECRET'),
    {
        expiresIn: '5m',
    },
);
const resetPasswordTemplatePath = path.join(TEMPLATES_DIR,'reset-password-email.html')
const templateSource = (
    (await fs.readFile(resetPasswordTemplatePath)).toString()
)
const template = handlebars.compile(templateSource)
const html = template(
    {
        name: request.name,
        link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`
    }
)
await sendMail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html
})
}

export const resetPassword = async (payload) => {
    let entries;

    try {
        entries = jwt.verify(payload.token, env('JWT_SECRET'))
    } catch(err) {
  if(err instanceof Error) {
    throw createHttpError(401, err.message)
  }
  throw err
    }
    const user = UserCollection.findOne({
        email: entries.email,
        _id: entries.sub
    })
    if(!user) throw createHttpError(404, 'User not found')
        const encryptedPassword = await bcrypt.hash(payload.password,10)
    await UserCollection.updateOne(
        {_id:user._id},
       { password: encryptedPassword}
    )
}