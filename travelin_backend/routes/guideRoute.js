import express from "express";
const router = express.Router()
import upload from "../middlewares/multer-middleware.js";
import guideController from "../controllers/guideController.js";


router.use("/postDetail", upload)
router.use("/getDetail", upload)

router.post("/postDetail", guideController.postDetail)
router.get("/getDetail", guideController.getDetail)
router.delete("/deleteDetail/:id", guideController.deleteDetail)

export default router