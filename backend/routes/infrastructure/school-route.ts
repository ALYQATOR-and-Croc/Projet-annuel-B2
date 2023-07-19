import express from 'express';
import {isAuthenticated} from '../../middleware/is-auth';
import { isEducationManager } from '../../middleware/roles-middleware';
import {} from '../../controllers/users/roles-controller';
import {
  getSchoolGET,
  newSchoolPOST,
  getSchoolByIdGET,
  patchSchoolPATCH,
  deleteSchoolDELETE,
} from '../../controllers/infrastructure/school-controller';

const router = express.Router();

router.post('/school/new/', isAuthenticated, isEducationManager, newSchoolPOST);

router.get('/schools/', isAuthenticated, isEducationManager, getSchoolGET);

router.get(
  '/school/:idSchool/',
  isAuthenticated,
  isEducationManager,
  getSchoolByIdGET
);

router.patch(
  '/school/:idSchool/',
  isAuthenticated,
  isEducationManager,
  patchSchoolPATCH
);

router.delete(
  '/school/:idSchool/',
  isAuthenticated,
  isEducationManager,
  deleteSchoolDELETE
);

export = router;
