import express from 'express';
import {
  CampusEnum,
  CampusPOST,
} from '../../models/infrastructure/campus-model';
import * as config from '../../config.json';
import sql from 'mssql';

const newCampusPOST = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const body = request.body;
    const sqlQueryData: CampusPOST = {
      libelleCampus: body.libelle_campus,
      adresseCampus: body.adresse_campus,
      codePostalCampus: body.codePostalCampus,
    };
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            INSERT INTO ${CampusEnum.NOM_TABLE} (${CampusEnum.LIBELLE}, ${CampusEnum.ADRESSE}, ${CampusEnum.CODEPOSTAL})
            VALUES 
            ('${sqlQueryData.libelleCampus}', '${sqlQueryData.adresseCampus}', '${sqlQueryData.codePostalCampus}')
            `;
        return pool.request().query(query);
      })
      .then(() => {
        response.status(201).send('Campus Successfully created');
      });
  } catch (error) {
    response.status(400);
  }
};

export { newCampusPOST };
