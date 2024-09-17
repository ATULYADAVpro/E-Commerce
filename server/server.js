/*================= IMPORTING =============== */
import express from "express"
import { connectDb, PORT } from "./utils/index.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRouter from "./routers/auth/authRoutes.js";
const app = express();

/*--------- MIDDLEWARE --------- */
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}))
app.use(cookieParser());
app.use(express.json())
app.use('/api/auth', authRouter)

/* ----- SERVER STARTING CALL ----- */
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER RUNNING:-> https://localhost:${PORT}`)
    })
})
