import * as dotenv from 'dotenv';

dotenv.config()

// Vars from dotenv file
export const PORT = process.env.PORT!;
export const MONGO_URI = process.env.MONGO_URI!;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const REDIRECT_URI = process.env.REDIRECT_URI!;

