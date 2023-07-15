import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin, isCourseManager } from '../../middleware/roles-middleware';
import {} from '../../controllers/users/roles-controller';
import { newSchoolPOST } from '../../controllers/infrastructure/school-controller';
import { getRoomsGET, newRoomPOST } from '../../controllers/infrastructure/room-controller';
import { request } from 'http';

const router = express.Router();

router.post(
  '/room/new/',
  isAuthenticated,
  isAdmin,
  // isRolesPOSTModel,
  newRoomPOST
);

router.get(
  '/rooms/',
  isAuthenticated,
  isCourseManager,
  getRoomsGET
)

router.get(
  '/rooms/campus/:idcampus',
  isAuthenticated,
  isCourseManager,
  getRoomsGET
)
export = router;
