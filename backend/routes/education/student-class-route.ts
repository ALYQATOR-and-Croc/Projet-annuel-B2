import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin } from '../../middleware/roles-middleware';
import { newClassPOST } from '../../controllers/education/student-class-controller';

const router = express.Router();

router.post('/class/new/', isAuthenticated, isAdmin, newClassPOST);

export = router;
