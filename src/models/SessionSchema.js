import { Schema, model } from "mongoose";
const sessionSchema = new Schema({
    userId: {type: Schema.Types.ObjectId,ref:"users", required: true},
    accessToken:{type: String, required: true},
    refreshToken: {type: String, required: true},
    accesTokenValidUntil: {type: Date, required: true},
    refreshTokenValidUntil: {type: Date, required: true},
},
    {timestamps: true, versionKey: false}
)
 const SessionsCollection = model('sessions', sessionSchema);
 export default SessionsCollection