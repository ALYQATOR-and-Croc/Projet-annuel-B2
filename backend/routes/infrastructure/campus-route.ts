import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin, isRolesPOSTModel } from '../../middleware/roles-middleware';
import {} from '../../controllers/users/roles-controller';
import { newCampusPOST } from '../../controllers/infrastructure/campus-controller';

const router = express.Router();

router.post(
  '/campus/new/',
  isAuthenticated,
  isAdmin,
  // isCampusPOSTModel,
  newCampusPOST
);
export = router;
