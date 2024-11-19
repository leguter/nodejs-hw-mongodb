import createHttpError from "http-errors"
import { findSession, findUser } from "../services/auth.js"

export const authenticate = async (req, res, next) => {
    const authHeader = req.get("Authorization")
    if(!authHeader) return next(createHttpError(401,"Authorization header missing"))
        const [Bearer, token] = authHeader.split(" ")
    if(Bearer !== "Bearer") return next(createHttpError(401,"Authorization header must be type Bearer"))
        const session = findSession({accesToken: token})
    if(!session) return next(createHttpError(401,"Session not found"))
        if(Date.now() > session.accesTokenValidUntil) return next(createHttpError(401,"Access token expired"))
            // console.log(session)
            const user = await findUser({id:session.userId}) 
        if(!user) return next(createHttpError(401,"User not found"))
     req.user = user
    next()
}