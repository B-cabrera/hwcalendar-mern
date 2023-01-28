import { Router} from 'express';
import {createNewClass, getAllClassNames, getAssignmentsByClassID} from './controllers/classController';

const router = Router();

router.get('/', getAllClassNames)
router.post('/class', createNewClass)
router.get('/:id', getAssignmentsByClassID)


export default router;


