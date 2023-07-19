import * as config from "../../config.json";
import sql from "mssql";
import express from "express";
import {
  RolesTypePOST,
  RolesEnum,
  UtilisateurPagination,
  RolePagination,
} from "../../models/users/roles-model";
import {
  queryPaginatedIntervenantPromoGET,
  queryPaginatedAttachePromoGET,
  queryPaginatedEtudiantGET,
  queryPaginatedReprographeGET,
  queryPaginatedResponsablePedagogiqueGET,
  FonctionType,
  queryDeleteUserDELETE,
  UtilisateurType,
  queryDeleteFonctionUserDELETE,
  queryPatchUserPATCH,
  newFunctionQuery,
  queryPaginatedAdminGET,
  UtilisateurEnum,
} from "../../models/users/user-model";
import { queryRoleGET } from "../../models/users/roles-model";
import isId from "../../models/integer-model";

const newRolePOST = (request: express.Request, response: express.Response) => {
  const body = request.body;
  const sqlBody: RolesTypePOST = {
    libelleRole: body.libelleRole,
    droits: body.droits,
  };
  try {
    sql
      .connect(config)
      .then((pool) => {
        const queryGET = `INSERT INTO ${RolesEnum.NOM_TABLE} (${RolesEnum.LIBELLE}, ${RolesEnum.DROITS}) VALUES ('${sqlBody.libelleRole}', '${sqlBody.droits}')`;
        return pool.request().query(queryGET);
      })
      .then((result) => {
        if (result) {
          response.status(201).send("New role was successfully created !");
        } else {
          throw new Error("Unacceptable operation.");
        }
      });
  } catch (error) {
    response.status(405).send(error);
  }
};

const paginatedRoleGET = (req: express.Request, res: express.Response) => {
  sql.connect(config).then((pool) => {
    const queryGET = queryRoleGET();
    pool
      .request()
      .query(queryGET)
      .then((result) => {
        if (result) {
          res.status(200).send(result.recordset);
        } else {
          res.status(405).send("Unacceptable operation.");
        }
      })
      .catch((error) => {
        res.status(405).send("Unacceptable operation.");
      });
  });
};

const reprographeGETList = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params: any = request.params;
    const page: number = params.pageNumber;
    const rowsNumber: number = params.rowsNumber;
    const orderBy: UtilisateurPagination = params.orderBy;

    sql.connect(config).then((pool) => {
      const queryGET = queryPaginatedReprographeGET(page, rowsNumber, orderBy);
      pool
        .request()
        .query(queryGET)
        .then((result) => {
          if (result) {
            response.status(200).send(result.recordset);
          } else {
            response.status(405).send("Unacceptable operation.");
          }
        });
    });
  } catch (error) {
    response.status(405).send("Unacceptable operation.");
  }
};

const etudiantGETList = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params: any = request.params;
    const page: number = params.pageNumber;
    const rowsNumber: number = params.rowsNumber;
    const orderBy: UtilisateurPagination = params.orderBy;

    sql.connect(config).then((pool) => {
      const queryGET: string = queryPaginatedEtudiantGET(
        page,
        rowsNumber,
        orderBy
      );
      pool
        .request()
        .query(queryGET)
        .then((result) => {
          if (result) {
            response.status(200).send(result.recordset);
          } else {
            response.status(405).send("Unacceptable operation.");
          }
        });
    });
  } catch (error) {
    response.status(405).send("Unacceptable operation.");
  }
};

const attachePromoGETList = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params: any = request.params;
    const page: number = params.pageNumber;
    const rowsNumber: number = params.rowsNumber;
    const orderBy: UtilisateurPagination = params.orderBy;

    sql.connect(config).then((pool) => {
      const queryGET = queryPaginatedAttachePromoGET(page, rowsNumber, orderBy);
      pool
        .request()
        .query(queryGET)
        .then((result) => {
          if (result) {
            response.status(200).send(result.recordset);
          } else {
            response.status(405).send("Unacceptable operation.");
          }
        });
    });
  } catch (error) {
    response.status(405).send("Unacceptable operation.");
  }
};

const intervenantGETList = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params: any = request.params;
    const page: number = params.pageNumber;
    const rowsNumber: number = params.rowsNumber;
    const orderBy: UtilisateurPagination = params.orderBy;
    sql.connect(config).then((pool) => {
      const queryGET = queryPaginatedIntervenantPromoGET(
        page,
        rowsNumber,
        orderBy
      );
      pool
        .request()
        .query(queryGET)
        .then((result) => {
          if (result) {
            response.status(200).send(result.recordset);
          } else {
            response.status(405).send("Unacceptable operation.");
          }
        });
    });
  } catch (error) {
    response.status(405).send("Unacceptable operation.");
  }
};

const responsablePedagogiqueGETList = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params: any = request.params;
    const page: number = params.pageNumber;
    const rowsNumber: number = params.rowsNumber;
    const orderBy: UtilisateurPagination = params.orderBy;
    sql.connect(config).then((pool) => {
      const queryGET = queryPaginatedResponsablePedagogiqueGET(
        page,
        rowsNumber,
        orderBy
      );
      pool
        .request()
        .query(queryGET)
        .then((result) => {
          if (result) {
            response.status(200).send(result.recordset);
          } else {
            response.status(405).send("Unacceptable operation.");
          }
        });
    });
  } catch (error) {
    response.status(405).send("Unacceptable operation.");
  }
};

const adminGETList = (request: express.Request, response: express.Response) => {
  try {
    const params: any = request.params;
    const page: number = params.pageNumber;
    const rowsNumber: number = params.rowsNumber;
    const orderBy: UtilisateurPagination = params.orderBy;
    sql.connect(config).then((pool) => {
      const queryGET = queryPaginatedAdminGET(page, rowsNumber, orderBy);
      pool
        .request()
        .query(queryGET)
        .then((result) => {
          if (result) {
            response.status(200).send(result.recordset);
          } else {
            response.status(405).send("Unacceptable operation.");
          }
        });
    });
  } catch (error) {
    response.status(405).send("Unacceptable operation.");
  }
};

const deleteUserDELETE = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params: any = request.params;
    const idUser: number = Number(params.idUser);
    const fonctionUser: FonctionType = params.functionUser;
    console.log(idUser, fonctionUser);
    if (!isId([idUser])) {
      throw new Error("Bad Request");
    }
    console.log(queryDeleteFonctionUserDELETE(idUser), "\n\n\n");
    sql.connect(config).then((pool) => {
      pool
        .request()
        .query(queryDeleteFonctionUserDELETE(idUser))
        .then(() => {
          const query = queryDeleteUserDELETE(idUser, fonctionUser);
          return pool.request().query(query);
        })
        .then(() => {
          return response.status(201).send("User successfully deleted !");
        })
        .catch((error) => {
          console.log(error.message);
          return response.status(405).send("Can't delete user");
        });
    });
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
};

const patchUserPATCH = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params: any = request.params;
    const body: any = request.body;
    const idUser: number = Number(params.idUser);
    const fonctionParameters: any = body.fonctionParameters;
    const ancienneFonction: FonctionType = body.ancienneFonction;
    const bodyQuery: UtilisateurType = {
      nomUtilisateur: body.nom,
      prenomUtilisateur: body.prenom,
      emailUtilisateur: body.email,
      mdp: "",
      idRole: body.idRole,
      fonction: body.fonction,
    };
    if (!isId([idUser, bodyQuery.idRole])) {
      throw new Error("Bad Request");
    }
    console.log(bodyQuery);
    if (ancienneFonction !== bodyQuery.fonction) {
      sql.connect(config).then((pool) => {
        const queryDELETE = queryDeleteFonctionUserDELETE(idUser);
        pool
          .request()
          .query(queryDELETE)

          .then(() => {
            const queryPATCH = queryPatchUserPATCH(idUser, bodyQuery);
            pool
              .request()
              .query(queryPATCH)
              .catch((error) => {
                console.log(error.message);
                return response.status(405).send("Error while updating user");
              })
              .then(() => {
                const queryNewFunction = newFunctionQuery(
                  bodyQuery.fonction,
                  idUser,
                  fonctionParameters
                );
                if (queryNewFunction !== null) {
                  pool
                    .request()
                    .query(queryNewFunction)
                    .then(() => {
                      return response
                        .status(201)
                        .send("User successfully updated !");
                    })
                    .catch((error) => {
                      console.log(error.message);
                      return response
                        .status(405)
                        .send("Error while updating user");
                    });
                }
              });
          })
          .catch((error) => {
            console.log(error.message);
            return response.status(405).send("Can't delete user");
          });
      });
    } else {
      const queryPATCH = queryPatchUserPATCH(idUser, bodyQuery);
      sql.connect(config).then((pool) => {
        pool
          .request()
          .query(queryPATCH)
          .then(() => {
            return response.status(201).send("User successfully updated !");
          })
          .catch((error) => {
            console.log(error.message);
            return response.status(405).send("Error while updating user");
          });
      });
    }
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
};

const getAllUsersGET = (
  request: express.Request,
  response: express.Response
) => {
  try {
    sql
      .connect(config)
      .then((pool) => {
        const queryGET = `SELECT 
      ${UtilisateurEnum.PK} AS idUser,
      ${UtilisateurEnum.NOM} AS nomUser,
      ${UtilisateurEnum.PRENOM} AS prenomUser,
      ${UtilisateurEnum.EMAIL} AS emailUser
      FROM ${UtilisateurEnum.NOM_TABLE}`;
        pool
          .request()
          .query(queryGET)
          .then((result) => {
            if (result) {
              return response.status(200).send(result.recordset);
            } else {
              return response.status(405).send("Unacceptable operation.");
            }
          })
          .catch((error) => {
            console.log(error.message);
            return response.status(405).send("Error while getting users");
          });
      })
      .catch((error) => {
        console.log(error.message);
        return response.status(405).send("Error while getting users");
      });
  } catch (error) {
    response.status(405).send("Unacceptable operation.");
  }
};

export {
  newRolePOST,
  reprographeGETList,
  etudiantGETList,
  attachePromoGETList,
  intervenantGETList,
  responsablePedagogiqueGETList,
  paginatedRoleGET,
  deleteUserDELETE,
  patchUserPATCH,
  adminGETList,
  getAllUsersGET,
};
