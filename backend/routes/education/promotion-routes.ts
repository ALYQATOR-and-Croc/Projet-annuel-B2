import express from 'express';
import {isAuthenticated} from '../../middleware/is-auth';
import { isAdmin, isEducationManager } from '../../middleware/roles-middleware';
import { PromotionEnum } from '../../models/education/promotion-model';
import { newPromotionPOST, patchPromotionPATCH, getPaginatedPromotionGET, getPromotionByIdGET, deletePromotionDELETE } from '../../controllers/education/promotion-controller';

const router = express.Router();

router.post('/promotion/new/', isAuthenticated, isEducationManager, newPromotionPOST);

router.get('/promotions/page/:page/rows/:rowsNumber/order/:orderBy/', isAuthenticated, isEducationManager, getPaginatedPromotionGET);

router.get('/promotion/:idPromotion/', isAuthenticated, isEducationManager, getPromotionByIdGET);

router.patch('/promotion/:idPromotion/', isAuthenticated, isEducationManager, patchPromotionPATCH);

router.delete('/promotion/:idPromotion/', isAuthenticated, isEducationManager, deletePromotionDELETE);

export = router;
