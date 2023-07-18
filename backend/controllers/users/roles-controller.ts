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

const deleteUserDELETE = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params: any = request.params;
    const idUser: number = Number(params.idUser);
    const fonctionUser: FonctionType = params.fonctionUser;
    if (!isId([idUser])) {
      throw new Error("Bad Request");
    }
    sql
      .connect(config)
      .then((pool) => {
        const query = queryDeleteUserDELETE(idUser, fonctionUser);
        return pool.request().query(query);
      })
      .then(() => {
        response.status(201).send("User successfully deleted !");
      });
  } catch (error) {
    response.status(400).send("Bad Request");
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
  deleteUserDELETE
};
