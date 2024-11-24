import { one_day } from "../constants/auth.js";
import { registerUser, loginUser, refreshUser, logoutUser, requestResetEmail, resetPassword} from "../services/auth.js";
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
  res.status(200).json({
    status: 200,
    message: "Successfully login a user",
    data:{
      accessToken: user.accessToken,
     }
  })
}
export const refreshSessionController = async (req, res) => {
    const session = await refreshUser({sessionId: req.cookies.sessionId, refreshToken: req.cookies.refreshToken})
    setupSession(res, session);
    res.status(200).json({
      status: 200,
      message: "Successfully refresh a user",
      data:{
       accessToken: session.accessToken,
      }
    })
}
export const logoutUserController = async (req, res) => {
  if(req.cookies.sessionId) {
    await logoutUser({sessionId:req.cookies.sessionId})
  }
  res.clearCookie('sessionId')
  res.clearCookie('refreshToken')
  res.status(204).send()
}
export const resetEmailController = async (req, res) => {
  const email = req.body.email;
  await requestResetEmail(email)
  res.json({
    message: "Reset password email was successfuly sent",
    status: 200,
    data: {}
  })

}
export const resetPasswordController = async(req,res) => {
  await resetPassword(req.body)
  res.json({
    message: "Password was successfully reset",
    status: 200,
    data: {}
  })
}