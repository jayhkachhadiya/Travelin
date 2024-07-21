import express from 'express'
const router = express.Router()
import checkAdminAuth from '../middlewares/admin-middleware.js'
import adminController from '../controllers/adminController.js'



router.get("/savedAdminDetail",adminController.saveDetail)

router.post("/loginAdmin",adminController.loginAdmin)

export default router