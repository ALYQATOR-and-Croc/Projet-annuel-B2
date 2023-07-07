import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isCourseManager } from '../../middleware/course-middelware';
import { newCoursePOST } from '../../controllers/education/course-controller';
import { newMatierePOST } from '../../controllers/education/matiere-controller';

const router = express.Router();

router.post(
  '/matiere/new/',
  isAuthenticated,
  // isCourseManager,
  newMatierePOST
);

export = router;
