import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin, isEducationManager } from '../../middleware/roles-middleware';
import {
  getAllClassGET,
  newClassPOST,
  patchClassPOST,
  getOneClassGET,
  deleteClassDELETE
} from '../../controllers/education/student-class-controller';

const router = express.Router();

router.post('/class/new/', isAuthenticated, isAdmin, newClassPOST);

router.get('/classes/', isAuthenticated, isEducationManager, getAllClassGET);

router.patch('/class/update/:idClass/', isAuthenticated, isAdmin, patchClassPOST);

router.get('/class/:id/', isAuthenticated, isEducationManager, getOneClassGET);

router.delete('/class/:idClass/', isAuthenticated, isAdmin, deleteClassDELETE);

export = router;
