import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import {
  isConcernedByStudentCourse,
  isCourseManager,
  isEducationManager,
} from '../../middleware/roles-middleware';
import {
  courseByIdGET,
  coursesPagesGET,
  coursesStudentGET,
  deleteCourseDELETE,
  newCoursePOST,
} from '../../controllers/education/course-controller';

const router = express.Router();

router.post(
  '/courses/new/',
  isAuthenticated,
  isEducationManager,
  newCoursePOST
);

router.get(
  '/courses/page/user/:idUser/start-date/:startDate/number-of-days/:numberOfDays/',
  isAuthenticated,
  isConcernedByStudentCourse,
  coursesPagesGET
);

router.get(
  '/course/:idCourse/',
  isAuthenticated,
  isConcernedByStudentCourse,
  courseByIdGET
);

router.get(
  '/courses/course/:idCourse/page/students/',
  isAuthenticated,
  isConcernedByStudentCourse,
  coursesStudentGET
);

router.delete(
  '/courses/course/:idCourse/',
  isAuthenticated,
  isEducationManager,
  deleteCourseDELETE
);

export = router;
