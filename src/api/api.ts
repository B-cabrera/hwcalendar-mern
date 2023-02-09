import { Router } from 'express';
import { createNewAssignment, deleteAssignment, getAssignmentsByClassID, toggleAssignment } from './controllers/assignmentController';
import {
  createNewClass,
  deleteClass,
  getAllClassNames,
} from './controllers/classController';

const router = Router();

router.get('/', getAllClassNames)
router.get('/:id', getAssignmentsByClassID)
router.post('/class', createNewClass)
router.post('/assignment', createNewAssignment)
router.patch('/assignment', toggleAssignment);
router.delete('/class/:id', deleteClass);
router.delete('/assignment/:hwID/:classID', deleteAssignment)



export default router;


