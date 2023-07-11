import * as config from '../../config.json';
import sql from 'mssql';
import express, { query } from 'express';
import {
  RolesTypePOST,
  RolesEnum,
  UtilisateurPagination,
} from '../../models/users/roles-model';
import { ReprographeEnum } from '../../models/users/reprographe-model';
import {
  UtilisateurEnum,
  queryPaginatedIntervenantPromoGET,
  queryPaginatedAttachePromoGET,
  queryPaginatedEtudiantGET,
  queryPaginatedReprographeGET,
  queryPaginatedResponsablePedagogiqueGET,
  utilisateurColumns,
} from '../../models/users/user-model';
import { EtudiantEnum } from '../../models/users/etudiant-model';
import { AttachePromotionEnum } from '../../models/users/attache-promotion-model';
import { IntervenantEnum } from '../../models/users/intervenant';
import { ResponsablePedagogiqueEnum } from '../../models/users/resp-pedago-model';

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
          response.status(201).send('New role was successfully created !');
        } else {
          throw new Error('Unacceptable operation.');
        }
      });
  } catch (error) {
    response.status(405).send(error);
  }
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
      console.log(utilisateurColumns[orderBy]);
      const queryGET = queryPaginatedReprographeGET(page, rowsNumber, orderBy);
      pool
        .request()
        .query(queryGET)
        .then((result) => {
          if (result) {
            response.status(200).send(result.recordset);
          } else {
            response.status(405).send('Unacceptable operation.');
          }
        });
    });
  } catch (error) {
    response.status(405).send('Unacceptable operation.');
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
      console.log(utilisateurColumns[orderBy]);
      const queryGET = queryPaginatedEtudiantGET(page, rowsNumber, orderBy);
      pool
        .request()
        .query(queryGET)
        .then((result) => {
          if (result) {
            response.status(200).send(result.recordset);
          } else {
            response.status(405).send('Unacceptable operation.');
          }
        });
    });
  } catch (error) {
    response.status(405).send('Unacceptable operation.');
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
      console.log(utilisateurColumns[orderBy]);

      const queryGET = queryPaginatedAttachePromoGET(page, rowsNumber, orderBy);
      pool
        .request()
        .query(queryGET)
        .then((result) => {
          if (result) {
            response.status(200).send(result.recordset);
          } else {
            response.status(405).send('Unacceptable operation.');
          }
        });
    });
  } catch (error) {
    response.status(405).send('Unacceptable operation.');
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
      console.log(utilisateurColumns[orderBy]);

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
            response.status(405).send('Unacceptable operation.');
          }
        });
    });
  } catch (error) {
    response.status(405).send('Unacceptable operation.');
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
      console.log(utilisateurColumns[orderBy]);

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
            response.status(405).send('Unacceptable operation.');
          }
        });
    });
  } catch (error) {
    response.status(405).send('Unacceptable operation.');
  }
};

export {
  newRolePOST,
  reprographeGETList,
  etudiantGETList,
  attachePromoGETList as attache_promoGETList,
  intervenantGETList,
  responsablePedagogiqueGETList,
};
