import { RolesTypePOST } from '../models/users/roles-model';
import * as jwt from 'jsonwebtoken';
import express, { response } from 'express';
import * as secretPass from '../CONFIG-FILES/secret-password.json';
import { onlyLowercaseRegExp } from '../Regex/string-regex';
import { isRightRoleEnum } from '../models/users/roles-model';


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

const isAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.get('Authorization');
    await hasTheRights(authHeader, ['ADMINISTRATEUR'])
      .then((isRightRole) => {
        if (isRightRole) {
          next();
        } else {
          res.status(401).send('Unauthorized request.');
        }
      })
      .catch((error) => {
        res.status(403).send('Forbidden request parameters.');
      });
  } catch (error) {
    res.status(403).send('Forbidden request parameters.');
  }
};
const isEducationManager = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.get('Authorization');
    await hasTheRights(authHeader, [
      isRightRoleEnum.ADMINISTRATEUR,
      isRightRoleEnum.ATTACHE_PROMO,
      isRightRoleEnum.REPROGRAPHE,
      isRightRoleEnum.RESPONSABLE_PEDA,
    ])
      .then((isRightRole) => {
        if (isRightRole) {
          next();
        } else {
          res.status(401).send('Unauthorized request.');
        }
      })
      .catch((error) => {
        res.status(403).send('Forbidden request parameters.');
      });
  } catch (error) {
    res.status(403).send('Forbidden request parameters.');
  }
};

const hasTheRights = async (
  authHeader: any,
  roles: string[]
): Promise<boolean> => {
  const token = authHeader!.replace('Bearer ', '');
  return await decodeToken(token).then((decodedToken) => {
    if (roles.includes(decodedToken.aud)) {
      return true;
    } else {
      return false;
    }
  });
};

async function decodeToken(token: string) {
  const decodedToken: any = jwt.verify(token, secretPass.passwordToken);
  return decodedToken;
}

const isCourseManager = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.get('Authorization');
    await hasTheRights(authHeader, [
      isRightRoleEnum.ADMINISTRATEUR,
      isRightRoleEnum.ATTACHE_PROMO,
      isRightRoleEnum.REPROGRAPHE,
      isRightRoleEnum.RESPONSABLE_PEDA,
      isRightRoleEnum.INTERVENANT,
    ])
      .then((isRightRole) => {
        if (isRightRole) {
          next();
        } else {
          res.status(401).send('Unauthorized request.');
        }
      })
      .catch((error) => {
        res.status(403).send('Forbidden request parameters.');
      });
  } catch (error) {
    res.status(403).send('Forbidden request parameters.');
  }
};

const isConcernedByStudentCourse = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.get('Authorization');
    await hasTheRights(authHeader, [
      isRightRoleEnum.ADMINISTRATEUR,
      isRightRoleEnum.ATTACHE_PROMO,
      isRightRoleEnum.REPROGRAPHE,
      isRightRoleEnum.RESPONSABLE_PEDA,
      isRightRoleEnum.INTERVENANT,
      isRightRoleEnum.ETUDIANT,
    ])
      .then((isRightRole) => {
        if (isRightRole) {
          next();
        } else {
          res.status(401).send('Unauthorized request.');
        }
      })
      .catch((error) => {
        res.status(403).send('Forbidden request parameters.');
      });
  } catch (error) {
    res.status(403).send('Forbidden request parameters.');
  }
};

export {
  isRolesPOSTModel,
  isAdmin,
  isEducationManager,
  isCourseManager,
  isConcernedByStudentCourse,
};
