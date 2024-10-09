import express from "express";
import cors from "cors";
import { CORS_ORIGIN } from "../constants.js";

const app = express()

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({
    limit: "16kb",
}))

app.use(express.urlencoded({
    limit: "16kb",
    extended: "true",
}))

// import router
import getdataRouter from "./routes/getdata.route.js";
import gettransactionRouter from "./routes/gettransactions.route.js";
import getstatsRouter from "./routes/getStats.route.js";
import bargraphRouter from "./routes/bargraph.route.js";
import piechartRouter from "./routes/piechart.route.js";

// create routes
app.use('/api/v1/getdata', getdataRouter)
app.use('/api/v1/transactions', gettransactionRouter)
app.use('/api/v1/stats', getstatsRouter)
app.use('/api/v1/bargraph', bargraphRouter)
app.use('/api/v1/piechart', piechartRouter)

export { app };