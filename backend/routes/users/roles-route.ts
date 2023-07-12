import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin, isEducationManager } from '../../middleware/roles-middleware';
import {
  newRolePOST,
  reprographeGETList,
  etudiantGETList,
  attache_promoGETList,
  intervenantGETList,
  responsablePedagogiqueGETList,
} from '../../controllers/users/roles-controller';

const router = express.Router();

router.post('/roles/', isAuthenticated, isAdmin, newRolePOST);

router.get(
  '/roles/reprographes/page/:pageNumber/rows/:rowsNumber/order/:orderBy/',
  isAuthenticated,
  isEducationManager,
  reprographeGETList
);

router.get(
  '/roles/etudiants/page/:pageNumber/rows/:rowsNumber/order/:orderBy/',
  isAuthenticated,
  isEducationManager,
  etudiantGETList
);

router.get(
  '/roles/attache_promo/page/:pageNumber/rows/:rowsNumber/order/:orderBy/',
  isAuthenticated,
  isEducationManager,
  attache_promoGETList
);

router.get(
  '/roles/intervenant/page/:pageNumber/rows/:rowsNumber/order/:orderBy/',
  isAuthenticated,
  isEducationManager,
  intervenantGETList
);

router.get(
  '/roles/responsable_pedago/page/:pageNumber/rows/:rowsNumber/order/:orderBy/',
  isAuthenticated,
  isEducationManager,
  responsablePedagogiqueGETList
);

export = router;
