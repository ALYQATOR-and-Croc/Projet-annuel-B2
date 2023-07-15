import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin, isEducationManager } from '../../middleware/roles-middleware';
import {
  getAllClassGET,
  newClassPOST,
  patchClassPOST,
} from '../../controllers/education/student-class-controller';

const router = express.Router();

router.post('/class/new/', isAuthenticated, isAdmin, newClassPOST);

router.get('/classes/', isAuthenticated, isEducationManager, getAllClassGET);

router.patch('/class/update/:id', isAuthenticated, isAdmin, patchClassPOST);

export = router;
