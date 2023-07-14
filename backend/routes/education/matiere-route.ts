import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isCourseManager } from '../../middleware/roles-middleware';
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
