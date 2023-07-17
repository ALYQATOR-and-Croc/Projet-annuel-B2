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
    let idSalle: number | null = null;
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
        'idSalle' in body ? (idSalle = body.idSalle) : (idSalle = 10);
        queryNewFunction = `
      INSERT INTO ${ResponsablePedagogiqueEnum.NOM_TABLE} (${ResponsablePedagogiqueEnum.FK_UTILISATEUR}, ${ResponsablePedagogiqueEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${idSalle})
      `;
        break;
      case FonctionEnum.REPROGRAPHE:
        'idSalle' in body ? (idSalle = body.idSalle) : (idSalle = 10);
        queryNewFunction = `
      INSERT INTO ${ReprographeEnum.NOM_TABLE} (${ReprographeEnum.FK_UTILISATEUR}, ${ReprographeEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${idSalle})
      `;
        break;
      case FonctionEnum.ATTACHE_PROMO:
        'idSalle' in body ? (idSalle = body.idSalle) : (idSalle = 10);
        queryNewFunction = `
      INSERT INTO ${AttachePromotionEnum.NOM_TABLE} (${AttachePromotionEnum.FK_UTILISATEUR}, ${AttachePromotionEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${idSalle})
      `;
        break;
      case FonctionEnum.ADMIN:
        break;

      default:
        throw new Error('');
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
    WHERE ${UtilisateurEnum.EMAIL} = '${loginAlias}';
    `;
        pool
          .request()
          .query(query)
          .then((reqResult) => {
            if (reqResult.recordset[0] === undefined) {
              throw new Error('User does not exists');
            }
            bcrypt
              .compare(loginPswd, reqResult.recordset[0][UtilisateurEnum.MDP])
              .then((isPswdEqual) => {
                if (isPswdEqual) {
                  return reqResult;
                } else {
                  throw new Error('Unauthorized');
                }
              })
              .catch((error1) => {
                console.log(error1.message);
                throw new Error('Unauthorized');
              })
              .then((resultAfterPswdTested) => {
                if (resultAfterPswdTested === undefined) {
                  throw new Error('User does not exists');
                }
                const resultFonctionType: FonctionType =
                  resultAfterPswdTested.recordset[0][RolesEnum.LIBELLE];
                const resultIdUser: number =
                  resultAfterPswdTested.recordset[0][UtilisateurEnum.PK];
                pool
                  .request()
                  .query(getIdFunctionQuery(resultFonctionType, resultIdUser))
                  .then((userIdFunction) => {
                    const payload = {
                      sub: loginAlias,
                      id: resultAfterPswdTested.recordset[0][
                        UtilisateurEnum.PK
                      ],
                      idFunction: userIdFunction.recordset[0]
                        ? userIdFunction.recordset[0].id_function
                        : 0,
                      role: resultAfterPswdTested.recordset[0][
                        RolesEnum.LIBELLE
                      ],
                      prenom:
                        resultAfterPswdTested.recordset[0][
                          UtilisateurEnum.PRENOM
                        ],
                      nom: resultAfterPswdTested.recordset[0][
                        UtilisateurEnum.NOM
                      ],
                      email:
                        resultAfterPswdTested.recordset[0][
                          UtilisateurEnum.EMAIL
                        ],
                    };
                    const claims = {
                      expiresIn: '12h',
                      audience:
                        resultAfterPswdTested.recordset[0][RolesEnum.DROITS],
                    };
                    response.status(200).json({
                      token: jwt.sign(
                        payload,
                        secretPass.passwordToken,
                        claims
                      ),
                      userId:
                        resultAfterPswdTested.recordset[0][
                          UtilisateurEnum.PK
                        ]?.toString(),
                    });
                  })
                  .catch((error2) => {
                    console.log(error2.message);
                    return response.status(401).send('Unauthorized');
                  });
              })
              .catch((error3) => {
                console.log(error3.message);
                return response.status(401).send('Unauthorized');
              });
          })
          .catch((error4) => {
            return response.status(401).send('Unauthorized');
          });
      })
      .catch((error5) => {
        throw new Error('Unauthorized');
      });
  } catch (error) {
    return response.status(401).send('Unauthorized');
  }
};

const getIdFunctionQuery = (
  fonctionType: FonctionType,
  fkUtilisateur: number
): string => {
  try {
    switch (fonctionType) {
      case FonctionEnum.ETUDIANT:
        return `SELECT ${EtudiantEnum.PK} AS id_function  FROM ${EtudiantEnum.NOM_TABLE} WHERE ${EtudiantEnum.FK_UTILISATEUR} = ${fkUtilisateur}`;
      case FonctionEnum.INTERVENANT:
        return `SELECT ${IntervenantEnum.PK} AS id_function  FROM ${IntervenantEnum.NOM_TABLE} WHERE ${IntervenantEnum.FK_UTILISATEUR} = ${fkUtilisateur}`;
      case FonctionEnum.RESPONSABLE_PEDA:
        return `SELECT ${ResponsablePedagogiqueEnum.PK} AS id_function  FROM ${ResponsablePedagogiqueEnum.NOM_TABLE} WHERE ${ResponsablePedagogiqueEnum.FK_UTILISATEUR} = ${fkUtilisateur}`;
      case FonctionEnum.REPROGRAPHE:
        return `SELECT ${ReprographeEnum.PK} AS id_function FROM ${ReprographeEnum.NOM_TABLE} WHERE ${ReprographeEnum.FK_UTILISATEUR} = ${fkUtilisateur}`;
      case FonctionEnum.ATTACHE_PROMO:
        return `SELECT ${AttachePromotionEnum.PK} AS id_function FROM ${AttachePromotionEnum.NOM_TABLE} WHERE ${AttachePromotionEnum.FK_UTILISATEUR} = ${fkUtilisateur}`;
      case FonctionEnum.ADMIN:
        return 'SELECT * FROM Utilisateur WHERE id_utilisateur = 0';
      default:
        throw new Error('');
    }
    throw new Error('Error');
  } catch (error) {
    throw new Error('Error');
  }
};

// const updatePasswordPUT = (
//   request: express.Request,
//   response: express.Response
// ) => {
//   try {
//     const body = request.body;
//     const idUser = body.idUser;
//     const oldPassword = body.oldPassword;
//     const newPassword = body.newPassword;
//     sql.connect(config).then((pool) => {
//       const query = `
//       SELECT ${UtilisateurEnum.MDP} FROM ${UtilisateurEnum.NOM_TABLE} WHERE ${UtilisateurEnum.PK} = ${idUser}
//       `;
//       pool
//         .request()
//         .query(query)
//         .then((result) => {
//           bcrypt
//             .compare(oldPassword, result.recordset[0][UtilisateurEnum.MDP])
//             .then((isPswdEqual) => {

export { login, signup };
