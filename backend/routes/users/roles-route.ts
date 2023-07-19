import express from 'express';
import {isAuthenticated} from '../../middleware/is-auth';
import { isAdmin, isEducationManager } from '../../middleware/roles-middleware';
import {
  newRolePOST,
  reprographeGETList,
  etudiantGETList,
  attachePromoGETList,
  intervenantGETList,
  responsablePedagogiqueGETList,
  paginatedRoleGET,
  patchUserPATCH,
  deleteUserDELETE,
  adminGETList,
  getAllUsersGET
} from '../../controllers/users/roles-controller';

const router = express.Router();

router.post('/roles/', isAuthenticated, isEducationManager, newRolePOST);

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
  attachePromoGETList
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

router.get(
  '/roles/admin/page/:pageNumber/rows/:rowsNumber/order/:orderBy/',
  isAuthenticated,
  isAdmin,
  adminGETList
)

router.patch('/user/:idUser/', isAuthenticated, isEducationManager, patchUserPATCH);

router.delete('/user/:idUser/', isAuthenticated, isEducationManager, deleteUserDELETE);

router.get('/roles/', isAuthenticated, isEducationManager, paginatedRoleGET);

router.get('/users/', isAuthenticated, isAdmin, getAllUsersGET);
export = router;
