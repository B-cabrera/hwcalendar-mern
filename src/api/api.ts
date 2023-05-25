import { Router } from 'express';
import { createNewAssignment, deleteAssignment, getAssignmentsByClassID, toggleAssignment, updateAssignment } from './controllers/assignmentController';
import {
  createNewClass,
  deleteClass,
  getAllClassNames,
  updateClassName,
} from './controllers/classController';
import { checkForLoggedIn, getGoogleClientID, initAuth } from './controllers/serverController';
import { verifyToken } from './middleware';

const router = Router();


router.get('/classes', verifyToken, getAllClassNames);
router.get('/:id', verifyToken, getAssignmentsByClassID); 
router.get('/auth/googleClient', getGoogleClientID); 
router.get('/auth/user', verifyToken, checkForLoggedIn);
router.post('/class', verifyToken, createNewClass); 
router.post('/assignment', verifyToken, createNewAssignment); 
router.post('/auth', initAuth); 
router.patch('/assignment', verifyToken, toggleAssignment);  
router.patch('/assignment/:id', verifyToken, updateAssignment); 
router.patch('/class/:id', verifyToken, updateClassName); 
router.delete('/class/:id', verifyToken, deleteClass); 
router.delete('/assignment/:hwID/:classID', verifyToken, deleteAssignment); 



export default router;


