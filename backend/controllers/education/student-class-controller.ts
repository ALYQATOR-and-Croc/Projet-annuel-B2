import express from 'express';
import { CoursEnum, CoursePOST } from '../../models/education/course-model';
import isId from '../../models/integer-model';
import { onlyLowercaseRegExp } from '../../Regex/string-regex';
import * as config from '../../config.json';
import sql from 'mssql';
import {
  StudClassEnum,
  StudClassPOST,
} from '../../models/education/student-class-model';

const newClassPOST = (request: express.Request, response: express.Response) => {
  try {
    const body = request.body;
    const sqlQueryBody: StudClassPOST = {
      libelleClasse: body.libelleClasse,
      idPromotion: body.idPromotion,
      idCampus: body.idCampus,
    };
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            INSERT INTO ${StudClassEnum.NOM_TABLE}
            (${StudClassEnum.LIBELLE}, ${StudClassEnum.FK_CAMPUS}, ${StudClassEnum.FK_PROMOTION})
            VALUES
            ('${sqlQueryBody.libelleClasse}', '${sqlQueryBody.idCampus}', '${sqlQueryBody.idPromotion}')
            `;
        return pool.request().query(query);
      })
      .then(() => {
        response.status(201).send('Class successfully created !');
      });
  } catch (error) {
    response.status(400).send('Bad Request');
  }
};

export { newClassPOST };
