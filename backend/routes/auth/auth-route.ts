import express, { Router } from 'express';
import * as config from '../../config.json';
import sql from 'mssql';
import { LoginBody } from '../../models/auth/auth-model';
import { login, signup, updatePasswordPATCH } from '../../controllers/auth/authentication';
import {isAuthenticated, isModifyingUserPswdRight} from '../../middleware/is-auth'; 


const router = express.Router();

router.post('/signup/', signup);
router.post('/login/', login);
router.patch('/pswd/', isAuthenticated, isModifyingUserPswdRight, updatePasswordPATCH)

export = router;
