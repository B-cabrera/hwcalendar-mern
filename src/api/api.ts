import { Router} from 'express';
import {getAllClasses} from './controllers/classController';

const router = Router();

router.route('/')
.get(getAllClasses);


export default router;


