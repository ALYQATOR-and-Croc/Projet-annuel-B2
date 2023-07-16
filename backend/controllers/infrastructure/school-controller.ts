import express from 'express';
import {
  SchoolEnum,
  SchoolPOST,
} from '../../models/infrastructure/school-model';
import * as config from '../../config.json';
import sql from 'mssql';

const newSchoolPOST = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const body = request.body;
  const sqlQueryData: SchoolPOST = {
    libelleEcole: body.libelleEcole,
    domaineEcole: body.domaineEcole,
  };
  sql
    .connect(config)
    .then((pool) => {
      const query = `
        INSERT INTO ${SchoolEnum.NOM_TABLE} (${SchoolEnum.LIBELLE}, ${SchoolEnum.DOMAINE})
        VALUES 
        ('${sqlQueryData.libelleEcole}', '${sqlQueryData.domaineEcole}')
        `;
      return pool.request().query(query);
    })
    .then(() => {
      response.status(201).send('School Successfully created');
    });
};

const getSchoolGET = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  sql
    .connect(config)
    .then((pool) => {
      const query = `

            SELECT * FROM ${SchoolEnum.NOM_TABLE}
            `;
      return pool.request().query(query);
    })
    .then((result) => {
      if (result) {
        response.status(200).send(result.recordset);
      } else {
        response.status(405).send('Unacceptable operation.');
      }
    })
    .catch((error) => {
      response.status(405).send('Unacceptable operation.');
    });
};

export { newSchoolPOST, getSchoolGET };
