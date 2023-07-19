import * as jwt from 'jsonwebtoken';
import express from 'express';
import * as secretPass from '../CONFIG-FILES/secret-password.json';
import { isRightRoleEnum } from '../models/users/roles-model';
import * as config from "../config.json";
import sql from "mssql";
import bcrypt from "bcryptjs";
import { UtilisateurEnum } from '../models/users/user-model';

const isAuthenticated = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = request.get('Authorization');
    if (!authHeader) {
      response.status(401).send('Error unauthorized');
    }
    const token = authHeader!.replace('Bearer ', '');
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secretPass.passwordToken);
      next();
    } catch (error: any) {
      response.status(401).send('Error unauthorized');
    }
  } catch (error) {
    response.status(401).send('Error unauthorized');
  }
};



const isModifyingUserPswdRight = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.get('Authorization');
    const formerPswd = req.body.formerPswd;
    const idUser = req.body.idUser;
    await hasTheRightsToModiFyPswd(authHeader, formerPswd, idUser)
      .then((isRightRole) => {
        if (isRightRole ) {
          // return res.send(isRightRole)
          next();
        } else {
          res.status(401).send('Unauthorized request.');
        }
      })
      .catch((error) => {
        console.log(error.message);
        res.status(403).send('Forbidden request parameters.');
      });
  } catch (error) {
    res.status(403).send('Forbidden request parameters.');
  }
};

const hasTheRightsToModiFyPswd = async (
  authHeader: any,
  formerPswd: string,
  idUser:number
): Promise<boolean> => {
  const token = authHeader!.replace('Bearer ', '');
   return await decodeToken(token).then(async (decodedToken) => {
    return await isUserToUser(idUser, decodedToken, formerPswd).then(async (isRightUser) => {
      console.log(isRightUser);
      console.log(decodedToken);
      console.log(decodedToken.aud);
      console.log(isRightRoleEnum.ADMINISTRATEUR);
      console.log(await hasTheRights(authHeader, [isRightRoleEnum.ADMINISTRATEUR]));
      if (await hasTheRights(authHeader, [isRightRoleEnum.ADMINISTRATEUR])) {
        return true
      } else if (isRightUser){
        return true;
      } 
      else {
        return false;
      }
    })

  });
};

async function isUserToUser(idUser : number, decodedToken: any, formerPswd: string) : Promise<boolean> {
  if (idUser === decodedToken.id) {
    const query = `SELECT * FROM ${UtilisateurEnum.NOM_TABLE} WHERE ${UtilisateurEnum.PK} = ${decodedToken.id}`;
    return await sql.connect(config).then(async (pool) => {
      return await pool.request().query(query).then(async (result) => {
        return bcrypt.compare(formerPswd, result.recordset[0][UtilisateurEnum.MDP]).then(async (isSame) => {
          return isSame
    });
  })})
  }else {
    return false
  }
}

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
export {isAuthenticated, isModifyingUserPswdRight};
