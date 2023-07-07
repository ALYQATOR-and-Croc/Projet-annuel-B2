import { RolesTypePOST } from '../models/users/roles-model';
import * as jwt from 'jsonwebtoken';
import express, { response } from 'express';
import * as secretPass from '../CONFIG-FILES/secret-password.json';
import { onlyLowercaseRegExp } from '../Regex/string-regex';

const ADMIN_RIGHTS = 'admin';
const isRolesPOSTModel = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const body = req.body;
    const rolesPOSTRequestbody: RolesTypePOST = {
      libelleRole: body.libelleRole,
      droits: body.droits,
    };
    if (onlyLowercaseRegExp([body.libelleRole, body.droits])) {
      next();
    } else {
      throw TypeError;
    }
  } catch (error) {
    res.status(403).send('Forbidden request parameters.');
  }
};
const isAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader!.replace('Bearer ', '');
    const decodedToken: any = jwt.verify(token, secretPass.passwordToken);
    if (decodedToken.aud !== 'admin') {
      throw new Error('Not authorized');
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};

export { isRolesPOSTModel, isAdmin };
