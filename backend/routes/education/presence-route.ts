import {
  updatePresencesPUT,
  getPresencesByStudentGET,
  getPresencesByCourseGET,
  updatePresencesPatch,
  deletePresenceDELETE
} from '../../controllers/education/presence-controller';
import {isAuthenticated} from '../../middleware/is-auth';
import {
  isConcernedByStudentCourse,
  isCourseManager,
} from '../../middleware/roles-middleware';
import express from 'express';

const router = express.Router();

router.get(
  '/course/presences/student/:idStudent/',
  isAuthenticated,
  isConcernedByStudentCourse,
  getPresencesByStudentGET
);

router.get(
  '/course/presences/course/:idCourse/',
  isAuthenticated,
  isCourseManager,
  getPresencesByCourseGET
);

router.put(
  '/course/presences/',
  isAuthenticated,
  isCourseManager,
  updatePresencesPUT
);

router.delete(
  '/course/presences/:idPresence/',
  isAuthenticated,
  isCourseManager,
  deletePresenceDELETE
);

router.patch(
  '/course/presence/:idPresence/',
  isAuthenticated,
  isCourseManager,
  updatePresencesPatch
);

export = router;
