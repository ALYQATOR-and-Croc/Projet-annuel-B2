import express from 'express';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin, isRolesPOSTModel } from '../../middleware/roles-middleware';
import { newRolePOST } from '../../controllers/users/roles-controller';

const router = express.Router();

router.post('/roles/', isAuthenticated, isAdmin, isRolesPOSTModel, newRolePOST);
export = router;
