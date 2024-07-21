import express from 'express'
const router = express.Router()
import contactController from '../controllers/contactController.js'
import checkUserAuth from '../middlewares/auth-middleware.js'

// router.use("/postDetail", checkUserAuth)

//public
router.get('/getDetail', contactController.getDetail)
router.put('/deleteDetail/:id', contactController.softDelete)

//protected
router.post('/postDetail', contactController.postDetail)
export default router   