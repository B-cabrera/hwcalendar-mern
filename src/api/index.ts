import express, { Application, Router } from 'express';
import router from './api';

const app: Application = express();
const port = process.env.PORT || 2004;

app.use(express.json())
app.use('/api', router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})