import express from 'express';
import {isAuthenticated} from '../../middleware/is-auth';
import {
  newMatierePOST,
  patchMatierePATCH,
  getMatiereByIdGET,
  getMatierePaginatedGET,
  deleteMatiereDELETE,
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
  '/matieres/page/:pageNumber/rows/:rowsNumber/order/:orderBy/',
  isAuthenticated,
  isEducationManager,
  getMatierePaginatedGET
);

router.delete(
  '/matiere/:idMatiere/',
  isAuthenticated,
  isEducationManager,
  deleteMatiereDELETE
);
export = router;
