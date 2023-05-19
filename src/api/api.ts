import { Router } from 'express';
import { createNewAssignment, deleteAssignment, getAssignmentsByClassID, toggleAssignment, updateAssignment } from './controllers/assignmentController';
import {
  createNewClass,
  deleteClass,
  getAllClassNames,
  updateClassName,
} from './controllers/classController';
import { getGoogleClientID, initAuth } from './controllers/serverController';

const router = Router();

router.get('/', getAllClassNames)
router.get('/:id', getAssignmentsByClassID)
router.get('/auth/googleClient', getGoogleClientID);
router.post('/class', createNewClass)
router.post('/assignment', createNewAssignment)
router.post('/auth', initAuth);
router.patch('/assignment', toggleAssignment);
router.patch('/assignment/:id', updateAssignment);
router.patch('/class/:id', updateClassName)
router.delete('/class/:id', deleteClass);
router.delete('/assignment/:hwID/:classID', deleteAssignment)



export default router;


