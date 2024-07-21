import express from 'express'
const router = express.Router()
import bookingController from '../controllers/bookingController.js'
import checkUserAuth from '../middlewares/auth-middleware.js'

router.use("/insertBookDetail/:id", checkUserAuth)

//public
router.get("/getBookDetail",bookingController.getDetail)
router.delete("/deleteBookDetail/:id",bookingController.deleteDetail)

//protected
router.post("/insertBookDetail/:id", bookingController.postDetail)

export default router