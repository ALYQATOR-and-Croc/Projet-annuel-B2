import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import {
  newMatierePOST,
  patchMatierePATCH,
  getMatiereByIdGET,
  getMatierePaginatedGET,
} from '../../controllers/education/matiere-controller';
import { isEducationManager } from '../../middleware/roles-middleware';

const router = express.Router();

router.post(
  '/matiere/new/',
  isAuthenticated,
  isEducationManager,
  newMatierePOST
);

router.patch(
  '/matiere/:idMatiere/',
  isAuthenticated,
  isEducationManager,
  patchMatierePATCH
);
router.get(
  '/matiere/:idMatiere/',
  isAuthenticated,
  isEducationManager,
  getMatiereByIdGET
);

router.get(
  '/matiere/page/:pageNumber/rows/:rowsNumber/order/:orderBy/',
  isAuthenticated,
  isEducationManager,
  getMatierePaginatedGET
);

export = router;
