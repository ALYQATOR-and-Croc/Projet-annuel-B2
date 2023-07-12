import { newPromotionPOST } from '../../controllers/education/promotion-controller';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin } from '../../middleware/roles-middleware';
import express from 'express';

const router = express.Router();

router.post('/course/presence/', isAuthenticated, isAdmin, newPromotionPOST);
