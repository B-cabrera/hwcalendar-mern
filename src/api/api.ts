import { Router } from 'express';
import { createNewAssignment, getAssignmentsByClassID, toggleAssignment } from './controllers/assignmentController';
import {
    createNewClass,
    getAllClassNames,
} from './controllers/classController';

const router = Router();

router.get('/', getAllClassNames)
router.get('/:id', getAssignmentsByClassID)
router.post('/class', createNewClass)
router.patch('/assignment', toggleAssignment);
router.post('/assignment', createNewAssignment)



export default router;


