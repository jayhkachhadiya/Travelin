import express from 'express'
const router = express.Router()
import subscribeController from "../controllers/subscribeController.js";


router.post("/postEmail", subscribeController.postEmail)
router.get('/getEmail',subscribeController.getEmail)
router.delete('/deleteEmail/:id',subscribeController.deleteEmail)


export default router