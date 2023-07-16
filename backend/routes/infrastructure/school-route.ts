import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import {
  isAdmin,
  isEducationManager,
  isRolesPOSTModel,
} from '../../middleware/roles-middleware';
import {} from '../../controllers/users/roles-controller';
import {
  getSchoolGET,
  newSchoolPOST,
} from '../../controllers/infrastructure/school-controller';

const router = express.Router();

router.post(
  '/school/new/',
  isAuthenticated,
  isEducationManager,
  // isRolesPOSTModel,
  newSchoolPOST
);

router.get(
  '/schools/',
  isAuthenticated,
  isEducationManager,
  // isRolesPOSTModel,
  getSchoolGET
);

export = router;
