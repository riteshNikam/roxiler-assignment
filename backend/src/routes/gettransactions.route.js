import { Router } from "express";
import { getTransactionsController } from "../controllers/gettransactions.controller.js";

const router = Router()

router.route('/').get(getTransactionsController)

export default router;
