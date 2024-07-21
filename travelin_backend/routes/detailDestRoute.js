import express from 'express'
const router = express.Router()
import detailDestController from "../controllers/detailDestController.js";
import upload from '../middlewares/multer-middleware.js'

router.use("/insertDest/:id",upload)

router.post("/insertDest/:id",detailDestController.insertDetail)
router.get("/getDetailById/:id",detailDestController.getDetailById)
router.get("/getDetail",detailDestController.getDetail)


export default router 