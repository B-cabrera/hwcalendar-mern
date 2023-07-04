import express, { Application } from 'express';
import {MONGO_URI, PORT} from './config';
import router from './api';

import mongoose from 'mongoose';
import cors from 'cors';



const app: Application = express();

app.use(cors({
  origin: 'https://hwcalendar-mern.vercel.app'
}));
app.use(express.json())
app.use('/api', router);

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI!).then(() => {
    app.listen(PORT);
    console.log(`We are listening on port:${PORT}`);
});

export default app;
