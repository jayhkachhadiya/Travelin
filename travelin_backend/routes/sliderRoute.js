import express from "express";
const router = express.Router()
import sliderController from "../controllers/sliderController.js";
import upload from "../middlewares/multer-middleware.js";

router.use("/insertDetail", upload)

router.post("/insertDetail", sliderController.insertDetail)
router.get("/getDetail", sliderController.getDetail)
router.delete("/deleteDetail/:id", sliderController.deleteDetail)


export default router