import express from 'express'
const router = express.Router()
import upload from '../middlewares/multer-middleware.js'
import destiController from '../controllers/destiController.js'


router.use("/postDesti", upload)
router.use("/updateDesti/:id", upload)

//public 
// router.post("/postDesti", destiController.postDest)
router.post("/postDesti", destiController.postDest)
router.put("/updateDesti/:id", destiController.updateDest)
router.delete("/deleteDesti/:id", destiController.deleteDest)

//protected
router.get("/getDesti", destiController.getDest)
export default router