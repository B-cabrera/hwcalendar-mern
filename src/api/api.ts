import { Router} from 'express';
import {addClass} from './controllers/addClassController';

const router = Router();


router.get('/class', addClass);


export default router;


