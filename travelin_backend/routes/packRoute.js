import express from 'express'
const router = express.Router()
import packController from '../controllers/packController.js'
// import checkUserAuth from '../middlewares/auth-middleware.js'
import upload from '../middlewares/multer-middleware.js'
// router.use("/getPackage", checkUserAuth)
router.use("/addPackage", upload)
router.use("/updatePackage/:id", upload)
//public
router.post("/addPackage", packController.insertPackage)
router.put("/updatePackage/:id", packController.updatePackage)
router.delete("/deletePackage/:id", packController.deletePackage)
router.get("/getPackageByTag/:tag", packController.getPackageByTag)

//protected
router.get("/getPackage", packController.getPackage)
router.get("/getPackageById/:id", packController.getPackageById)
export default router