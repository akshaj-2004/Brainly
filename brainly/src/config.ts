import dotenv from "dotenv";
dotenv.config();

export const connectionString = process.env.MONGO_URI!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const BACKEND_URL = process.env.BACKEND_URL!;
export const PORT=process.env.PORT!;
