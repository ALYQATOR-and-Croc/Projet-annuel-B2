import bcrypt from 'bcryptjs';
import validationResult from 'express-validator';
import { LoginBody } from '../../models/auth/auth-model';
import * as config from '../../config.json';
import sql from 'mssql';
import secretPass from '../../CONFIG-FILES/secret-password.json';
import * as jwt from 'jsonwebtoken';
import express from 'express';
import { error } from 'console';
import { UtilisateurEnum } from '../../models/users/user-model';
import {
  UtilisateurPOST,
  FonctionEnum,
  FonctionType,
} from '../../models/users/user-model';
import { EtudiantEnum } from '../../models/users/etudiant-model';
import { ReprographeEnum } from '../../models/users/reprographe-model';
import { IntervenantEnum } from '../../models/users/intervenant';
import { AttachePromotionEnum } from '../../models/users/attache-promotion-model';
import { ResponsablePedagogiqueEnum } from '../../models/users/resp-pedago-model';
import { RolesEnum } from '../../models/users/roles-model';

// TODO : create admin right check
const ADMIN_RIGHTS = 'admin';

/**
 * @param request
 * @param response
 */

const signup = (request: express.Request, response: express.Response) => {
  const body = request.body;
  const userSqlQuery: UtilisateurPOST = {
    nomUtilisateur: body.nom,
    prenomUtilisateur: body.prenom,
    emailUtilisateur: body.email,
    mdp: body.mdp,
    idRole: body.idRole,
    fonction: body.fonction,
  };
  bcrypt.hash(userSqlQuery.mdp, secretPass.passwordHashSalt).then((hash) => {
    sql.connect(config).then((pool) => {
      const queryNewUser = `
      DECLARE @InsertedIDs TABLE (${UtilisateurEnum.PK} INT PRIMARY KEY);
      INSERT INTO 
      ${UtilisateurEnum.NOM_TABLE} 
      (${UtilisateurEnum.PRENOM}, 
        ${UtilisateurEnum.NOM}, 
        ${UtilisateurEnum.EMAIL}, 
        ${UtilisateurEnum.MDP}, 
        ${UtilisateurEnum.FK_ROLE_UTILISATEUR})
      OUTPUT INSERTED.${UtilisateurEnum.PK} INTO @InsertedIDs
      VALUES
      ('${userSqlQuery.prenomUtilisateur}', 
        '${userSqlQuery.nomUtilisateur}', 
        '${userSqlQuery.emailUtilisateur}', 
        '${hash}', 
        ${userSqlQuery.idRole});
      SELECT id_utilisateur FROM @InsertedIDs;
      `;
      pool
        .request()
        .query(queryNewUser)
        .then((result) => {
          const queryFonction = newFunctionQuery(
            body.fonction,
            result.recordset[0][UtilisateurEnum.PK],
            body
          );
          if (queryFonction !== null) {
            return pool
              .request()
              .query(queryFonction)
              .then(() => {
                response.status(201).send('User was successfully created.');
              });
          } else {
            response.status(201).send('User was successfully created.');
          }
        });
    });
  });
};
const newFunctionQuery = (
  fonctionType: FonctionType,
  fkUtilisateur: number,
  body: any
): string | null => {
  try {
    let queryNewFunction: string | null = null;
    switch (fonctionType) {
      case FonctionEnum.ETUDIANT:
        queryNewFunction = `
      INSERT INTO ${EtudiantEnum.NOM_TABLE} (${EtudiantEnum.FK_UTILISATEUR}, ${EtudiantEnum.FK_CLASSE})
      VALUES
      (${fkUtilisateur}, ${body.idClasse})
      `;
        break;
      case FonctionEnum.INTERVENANT:
        queryNewFunction = `
      INSERT INTO ${IntervenantEnum.NOM_TABLE} (${IntervenantEnum.FK_UTILISATEUR}, ${IntervenantEnum.LIBELLE})
      VALUES
      (${fkUtilisateur}, '${body.libelleSpecialite}')
      `;
        break;
      case FonctionEnum.RESPONSABLE_PEDA:
        queryNewFunction = `
      INSERT INTO ${ResponsablePedagogiqueEnum.NOM_TABLE} (${ResponsablePedagogiqueEnum.FK_UTILISATEUR}, ${ResponsablePedagogiqueEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${body.idSalle})
      `;
        break;
      case FonctionEnum.REPROGRAPHE:
        queryNewFunction = `
      INSERT INTO ${ReprographeEnum.NOM_TABLE} (${ReprographeEnum.FK_UTILISATEUR}, ${ReprographeEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${body.idSalle})
      `;
        break;
      case FonctionEnum.ATTACHE_PROMO:
        queryNewFunction = `
      INSERT INTO ${AttachePromotionEnum.NOM_TABLE} (${AttachePromotionEnum.FK_UTILISATEUR}, ${AttachePromotionEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${body.idSalle})
      `;
        break;
      case FonctionEnum.ADMIN:
        break;

      default:
        throw new Error('Function does not exists.');
    }
    return queryNewFunction;
  } catch (error) {
    throw new Error('Error');
  }
};

const login = (request: express.Request, response: express.Response) => {
  try {
    const loginBody: LoginBody = request!.body;
    const loginAlias: string = loginBody.login;
    const loginPswd: string = loginBody.password;

    sql
      .connect(config)
      .then((pool) => {
        const query = `
    SELECT 
    ${UtilisateurEnum.PK},
    ${UtilisateurEnum.NOM}, 
    ${UtilisateurEnum.PRENOM}, 
    ${UtilisateurEnum.MDP}, 
    ${UtilisateurEnum.EMAIL}, 
    ${RolesEnum.NOM_TABLE}.${RolesEnum.DROITS}, 
    ${RolesEnum.NOM_TABLE}.${RolesEnum.LIBELLE} 
    FROM ${UtilisateurEnum.NOM_TABLE}
    RIGHT JOIN ${RolesEnum.NOM_TABLE} 
    ON ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.FK_ROLE_UTILISATEUR} = ${RolesEnum.NOM_TABLE}.${RolesEnum.PK}
    WHERE ${UtilisateurEnum.EMAIL} = '${loginAlias}'
    `;
        return pool.request().query(query);
      })
      .then((reqResult) => {
        bcrypt
          .compare(loginPswd, reqResult.recordset[0][UtilisateurEnum.MDP])
          .then((isPswdEqual) => {
            if (isPswdEqual) {
              console.log('Password is correct');
              return reqResult;
            } else {
              response.status(401).send('Password is incorrect');
            }
          })
          .then((resultAfterPswdTested) => {
            try {
              if (resultAfterPswdTested === undefined) {
                throw new Error('User does not exists');
              }

              const payload = {
                sub: loginAlias,
                id: resultAfterPswdTested.recordset[0][UtilisateurEnum.PK],
                role: resultAfterPswdTested.recordset[0][RolesEnum.LIBELLE],
              };
              const claims = {
                expiresIn: '5h',
                audience: resultAfterPswdTested.recordset[0][RolesEnum.DROITS],
              };
              response.status(200).json({
                token: jwt.sign(payload, secretPass.passwordToken, claims),
                userId:
                  resultAfterPswdTested.recordset[0][
                    UtilisateurEnum.PK
                  ]?.toString(),
              });
            } catch (error) {}
          });
      });
  } catch (error) {
    response.status(401).send(error);
  }
};

export { login, signup };
