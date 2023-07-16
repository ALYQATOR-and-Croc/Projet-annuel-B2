import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import {
  isAdmin,
  isEducationManager,
  isRolesPOSTModel,
} from '../../middleware/roles-middleware';
import {} from '../../controllers/users/roles-controller';
import {
  getCampusGET,
  newCampusPOST,
} from '../../controllers/infrastructure/campus-controller';
import { get } from 'http';

const router = express.Router();

router.post(
  '/campus/new/',
  isAuthenticated,
  isAdmin,
  // isCampusPOSTModel,
  newCampusPOST
);
router.get(
  '/campus/',
  isAuthenticated,
  isEducationManager,
  // isCampusPOSTModel,
  getCampusGET
);
export = router;
