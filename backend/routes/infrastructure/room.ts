import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin } from '../../middleware/roles-middleware';
import {} from '../../controllers/users/roles-controller';
import { newSchoolPOST } from '../../controllers/infrastructure/school-controller';
import { newRoomPOST } from '../../controllers/infrastructure/room-controller';

const router = express.Router();

router.post(
  '/room/new/',
  isAuthenticated,
  isAdmin,
  // isRolesPOSTModel,
  newRoomPOST
);
export = router;
