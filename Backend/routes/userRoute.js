import express from "express"
import { login, logOut, register } from "../controllers/userControllers.js"
const userRoute=express.Router()


userRoute.route('/register').post(register)
userRoute.route('/login').post(login)
userRoute.route('/logout').get(logOut)



export default userRoute