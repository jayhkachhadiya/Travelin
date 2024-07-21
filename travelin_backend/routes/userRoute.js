import express from 'express'
const router = express.Router()
import userController from '../controllers/userController.js'
import checkUserAuth from '../middlewares/auth-middleware.js'
import checkAdminAuth from '../middlewares/admin-middleware.js'

router.use("/changepassword", checkUserAuth)
router.use("/loggedUser", checkUserAuth)
router.use("/register/getUser", checkAdminAuth)

//public 
router.post("/register", userController.userRegister)
router.post("/register/verify", userController.userOtp)
router.post("/register/resend", userController.resendOTP)
router.post("/login", userController.userLogin)
router.post("/send-reset-password-email", userController.sendUserPasswordResetEmail)

router.get("/register/getUser", userController.getUser)

router.delete("/register/deleteUser/:id",userController.deleteUser)

// protected
router.post("/changepassword", userController.changeUserPassword)
router.get("/loggedUser",userController.loggedUser)
export default router