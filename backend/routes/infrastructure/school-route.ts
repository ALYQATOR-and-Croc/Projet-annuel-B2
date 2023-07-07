import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin, isRolesPOSTModel } from '../../middleware/roles-middleware';
import {} from '../../controllers/users/roles-controller';
import { newSchoolPOST } from '../../controllers/infrastructure/school-controller';

const router = express.Router();

router.post(
  '/school/new/',
  isAuthenticated,
  isAdmin,
  // isRolesPOSTModel,
  newSchoolPOST
);
export = router;
