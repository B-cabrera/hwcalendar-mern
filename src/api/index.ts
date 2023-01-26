import express, { Application, Router } from 'express';
import router from './api';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config()

const app: Application = express();
const PORT = process.env.PORT || 2004;

app.use(cors());
app.use(express.json())
app.use('/api', router);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI!).then(() => {
    app.listen(PORT);
    console.log(`We are listening on port:${PORT}`);
});
