import { Router} from 'express';
import {createNewClass, getAllClassNames} from './controllers/classController';

const router = Router();

router.route('/')
.get(getAllClassNames);

router.route('/class')
.post(createNewClass);


export default router;


