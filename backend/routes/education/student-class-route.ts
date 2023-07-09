import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin } from '../../middleware/roles-middleware';
import { newClassPOST, patchClassPOST } from '../../controllers/education/student-class-controller';

const router = express.Router();

router.post('/class/new/', isAuthenticated, isAdmin, newClassPOST);

router.patch('/class/update/:id', isAuthenticated, isAdmin, patchClassPOST);

router.delete('/class/delete/:id', isAuthenticated, isAdmin, patchClassPOST);

router.get('/class/promotion/:idPromotion', isAuthenticated, isAdmin, patchClassPOST);

router.get('/class/campus/:idCampus', isAuthenticated, isAdmin, patchClassPOST);

export = router;
