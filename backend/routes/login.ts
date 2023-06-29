import express from 'express';
import * as config from '../config.json';
import sql from 'mssql';
import { LoginBody } from '../models/login';
import login from '../controllers/authentication';
import isAuthenticated from '../middleware/is-auth';

const router = express.Router();

router.post('/login/', login);

export = router;
