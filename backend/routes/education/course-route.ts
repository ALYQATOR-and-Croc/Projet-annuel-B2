import express from 'express';
import {isAuthenticated} from '../../middleware/is-auth';
import {
  isConcernedByStudentCourse,
  isCourseManager,
  isEducationManager,
} from '../../middleware/roles-middleware';
import {
  courseByIdGET,
  coursesAllPagesGET,
  coursesPagesGET,
  coursesStudentGET,
  deleteCourseDELETE,
  newCoursePOST,
  patchCoursePATCH,
} from '../../controllers/education/course-controller';
const router = express.Router();

router.post(
  '/courses/new/',
  isAuthenticated,
  isEducationManager,
  newCoursePOST
);

router.get(
  '/courses/page/start-date/:startDate/number-of-days/:numberOfDays/',
  isAuthenticated,
  isEducationManager,
  coursesAllPagesGET
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

router.patch(
  '/courses/course/:idCourse/',
  isAuthenticated,
  isCourseManager,
  patchCoursePATCH
);

export = router;
