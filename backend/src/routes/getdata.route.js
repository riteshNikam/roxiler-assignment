import { Router } from "express";
import { getdataController } from "../controllers/getdata.controller.js";

const router = Router()

router.route('/').get(getdataController)

export default router; 
