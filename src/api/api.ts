import { Router } from 'express';
import {
    createNewClass,
    getAllClassNames,
    getAssignmentsByClassID,
    toggleAssignment
} from './controllers/classController';

const router = Router();

router.get('/', getAllClassNames)
router.get('/:id', getAssignmentsByClassID)
router.post('/class', createNewClass)
router.patch('/assignment', toggleAssignment);



export default router;


