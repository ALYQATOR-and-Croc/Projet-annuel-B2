import express from 'express';
import { CoursEnum, CoursePOST } from '../../models/education/course-model';
import isId from '../../models/integer-model';
import { onlyLowercaseRegExp } from '../../Regex/string-regex';
import * as config from '../../config.json';
import sql from 'mssql';
import { MatiereEnum, MatierePOST } from '../../models/education/matiere-model';

const newMatierePOST = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const body = request.body;
    const sqlQueryBody: MatierePOST = {
      libelleMatiere: body.libelleMatiere,
      idEcole: body.idEcole,
      idIntervenant: body.idIntervenant,
    };
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            INSERT INTO ${MatiereEnum.NOM_TABLE}
            (${MatiereEnum.LIBELLE}, ${MatiereEnum.FK_ECOLE}, ${MatiereEnum.FK_INTERVENANT})
            VALUES
            ('${sqlQueryBody.libelleMatiere}', ${sqlQueryBody.idEcole}, ${sqlQueryBody.idIntervenant})
            `;
        return pool.request().query(query);
      })
      .then(() => {
        response.status(201).send('Matiere successfully created !');
      });
  } catch (error) {
    response.status(400).send('Bad Request');
  }
};

export { newMatierePOST };
