import * as config from '../../config.json';
import sql from 'mssql';
import express from 'express';
import { RolesTypePOST, RolesEnum } from '../../models/users/roles-model';

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
        const query = `INSERT INTO ${RolesEnum.NOM_TABLE} (${RolesEnum.LIBELLE}, ${RolesEnum.DROITS}) VALUES ('${sqlBody.libelleRole}', '${sqlBody.droits}')`;
        return pool.request().query(query);
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

export { newRolePOST };
