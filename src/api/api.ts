import { Router } from 'express';
import { createNewAssignment, deleteAssignment, getAssignmentsByClassID, toggleAssignment, updateAssignment } from './controllers/assignmentController';
import {
  createNewClass,
  deleteClass,
  getAllClassNames,
  updateClassName,
} from './controllers/classController';
import { getGoogleClientID, initAuth } from './controllers/serverController';
import { verifyToken } from './middleware';

const router = Router();

// ROUTES WITH COMMAS MEAN I HAVE LOOKED OVER IT AND FIXED IT AFTER THE ADDITION OF USER AUTH

router.get('/', verifyToken, getAllClassNames);// DONE
router.get('/:id', verifyToken, getAssignmentsByClassID); // DONE
router.get('/auth/googleClient', getGoogleClientID); // DONE
router.post('/class', verifyToken, createNewClass); // DONE
router.post('/assignment', verifyToken, createNewAssignment); // DONE
router.post('/auth', initAuth); // DONE
router.patch('/assignment', verifyToken, toggleAssignment);
router.patch('/assignment/:id', verifyToken, updateAssignment);
router.patch('/class/:id', verifyToken, updateClassName);
router.delete('/class/:id', verifyToken, deleteClass);
router.delete('/assignment/:hwID/:classID', verifyToken, deleteAssignment);



export default router;


