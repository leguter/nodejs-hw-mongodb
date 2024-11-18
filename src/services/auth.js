import { UserCollection } from "../models/modelSchema.js";
export const registerUser = async( payload) => {
return await UserCollection.create(payload)
}