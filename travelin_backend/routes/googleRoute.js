import express from "express";
const router = express.Router()

import googleController from "../controllers/googleController.js";

router.get('/', googleController.getDetail)
router.get('/callback', googleController.getData)

export default router