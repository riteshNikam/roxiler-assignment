import { Router } from "express";
import { getpiechartdata } from "../controllers/piechart.controller.js";

const router = Router()

router.route('/').get(getpiechartdata)

export default router;
