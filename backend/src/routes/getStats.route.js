import { Router } from "express";
import { getStatsController } from "../controllers/statistics.controller.js";

const router = Router()

router.route('/').get(getStatsController)

export default router;
