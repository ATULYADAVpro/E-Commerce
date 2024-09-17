import { config } from "dotenv";
import connectDb from "./db/connectDb.js";
config();

// Exporting here
export const { PORT, DB_URL,CLIENT_SECRET_KEY } = process.env;
export { connectDb };
