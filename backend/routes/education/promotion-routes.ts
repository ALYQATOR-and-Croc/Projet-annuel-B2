import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin } from '../../middleware/roles-middleware';
import { PromotionEnum } from '../../models/education/promotion-model';
import { newPromotionPOST } from '../../controllers/education/promotion-controller';

const router = express.Router();

router.post('/promotion/new/', isAuthenticated, isAdmin, newPromotionPOST);

export = router;
