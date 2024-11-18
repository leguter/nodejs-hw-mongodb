import Joi from "joi";
import { typeList } from "../constants/movies.js";
export const validateUpdateSchema = Joi.object(
    {
        name: Joi.string().min(3).max(20),
        phoneNumber: Joi.string(),
        email: Joi.string().email(),
        isFavorite: Joi.boolean(),
        contactType: Joi.string().valid(...typeList)
    }
)
export const validateAddSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().email(),
        isFavorite: Joi.boolean(),
        contactType: Joi.string().valid(...typeList)
})