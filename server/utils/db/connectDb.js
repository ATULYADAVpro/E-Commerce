import mongoose from "mongoose"
import { DB_URL } from "../index.js"


const connectDb = async () => {
    try {
        mongoose.connect(DB_URL)
        console.log(`DATABASE CONNECTED SUCCESSFUL`)
    } catch (error) {
        console.log(`DATABASE CONNECTION FAILL: ${error.message}`)
    }
}

export default connectDb