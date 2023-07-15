import {
  getPresencesByStudentGET,
  updatePresencesPUT,
} from '../../controllers/education/presence-controller';
import isAuthenticated from '../../middleware/is-auth';
import {isConcernedByStudentCourse, isCourseManager } from '../../middleware/roles-middleware';
import express from 'express';

const router = express.Router();

router.get(
  '/course/presences/student/:idStudent/',
  isAuthenticated,
  isConcernedByStudentCourse,
  getPresencesByStudentGET
);

router.put(
  '/course/presences/',
  isAuthenticated,
  isCourseManager,
  updatePresencesPUT
);

// router.put('/course/presence/', isAuthenticated, isAdmin, updatePresencePUT);

// router.get('/course/presence/:idcourse/', isAuthenticated, isAdmin, coursePresenceGET);

// router.get('/course/presence/:idcourse/student/:idstudent', isAuthenticated, isAdmin, studentCoursePresenceGET);

// router.get('/course/presence/classe/:idclasse', isAuthenticated, isAdmin, classePrescenceGET);

export = router;
