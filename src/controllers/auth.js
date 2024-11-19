import { one_day } from "../constants/auth.js";
import { registerUser, loginUser, refreshUser} from "../services/auth.js";
const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + one_day),
  })
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + one_day),
  })
}
export const registerUserController = async (req,res) => {
    const user = await registerUser(req.body)

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user",
        data:user,
    })
}
export const loginUserController = async (req, res) => {
  const user =  await loginUser(req.body)
  setupSession(res, user)
  res.status(201).json({
    status: 201,
    message: "Successfully login a user",
    data:user.accessToken,
  })
}
export const refreshSessionController = async (req, res) => {
    const session = await refreshUser(req.cookies)
    setupSession(res, session);
    res.status(200).json({
      status: 200,
      message: "Successfully refresh a user",
      data:user.accessToken,
    })

}