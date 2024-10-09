import { Router } from "express";
import { bargraphController } from "../controllers/bargraph.controller.js";

const router = Router()

router.route('/').get(bargraphController)

export default router;