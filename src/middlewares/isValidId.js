import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
export const isValidId = (req,res,next)=> {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
 throw createHttpError(400,'pls check the the correctness of the id')
    }
    next()
}