import mongoose from "mongoose";
import { MONGO_CONNECTION_URI, DATABASE_NAME } from "../../constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(`${ MONGO_CONNECTION_URI }/${ DATABASE_NAME }`)
    } catch (error) {
        console.log('DATABASE CONNECTION ERROR', error)
        process.exit(1)
    }
}

export { connectDB }
