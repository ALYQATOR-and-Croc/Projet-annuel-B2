import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isCourseManager } from '../../middleware/course-middelware';
import {
  coursesPagesGET,
  coursesStudentGET,
  newCoursePOST,
} from '../../controllers/education/course-controller';

const router = express.Router();

router.post(
  '/courses/new/',
  isAuthenticated,
  // isCourseManager,
  newCoursePOST
);

router.get(
  '/courses/page/user/:idUser/start-date/:startDate/number-of-days/:numberOfDays/',
  isAuthenticated,
  coursesPagesGET
);

router.get(
  '/courses/course/:idCourse/page/students/',
  isAuthenticated,
  coursesStudentGET
);

export = router;
