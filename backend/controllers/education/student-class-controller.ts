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
import { request } from 'http';


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

const patchClassPOST = (request: express.Request, response: express.Response) => {
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
            PATCH ${StudClassEnum.NOM_TABLE}
            SET ${StudClassEnum.LIBELLE} = '${sqlQueryBody.libelleClasse}', ${StudClassEnum.FK_CAMPUS} = '${sqlQueryBody.idCampus}', ${StudClassEnum.FK_PROMOTION} = '${sqlQueryBody.idPromotion}'
            WHERE ${StudClassEnum.PK} = '${request.params.id}'
            `;
        return pool.request().query(query);
      })
      .then(() => {
        response.status(201).send('Class successfully updated !');
      });
  } catch (error) {
    response.status(400).send('Bad Request');
  }
};

const deleteClassPOST = (request: express.Request, response: express.Response) => {
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
            DELETE FROM ${StudClassEnum.NOM_TABLE}
            WHERE ${StudClassEnum.PK} = '${request.params.id}'
            `;
        return pool.request().query(query);
      })
      .then(() => {
        response.status(201).send('Class successfully deleted !');
      });
  } catch (error) {
    response.status(400).send('Bad Request');
  }
};

const getAllClassGET = (request: express.Request, response: express.Response) => {
  try {
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            SELECT * FROM ${StudClassEnum.NOM_TABLE}
            `;
        return pool.request().query(query);
      })
      .then((result) => {
        response.status(200).send(result.recordset);
      });
  } catch (error) {
    response.status(400).send('Bad Request');
  }
};

const getOneClassGET = (request: express.Request, response: express.Response) => {
  try {
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            SELECT * FROM ${StudClassEnum.NOM_TABLE}
            WHERE ${StudClassEnum.PK} = '${request.params.id}'
            `;
        return pool.request().query(query);
      })
      .then((result) => {
        response.status(200).send(result.recordset);
      });
  } catch (error) {
    response.status(400).send('Bad Request');
  }
};

const getOneClassByPromoGET = (
  request: express.Request,
  response: express.Response
) => {
  try {
    sql
      .connect(config)
      .then((pool) => {
        const query = `

            SELECT * FROM ${StudClassEnum.NOM_TABLE}
            WHERE ${StudClassEnum.FK_PROMOTION} = '${request.params.id}'
            `;
        return pool.request().query(query);
      })
      .then((result) => {
        response.status(200).send(result.recordset);
      });
  } catch (error) {
    response.status(400).send('Bad Request');
  }
};

const getOneClassByCampusGET = (
  request: express.Request,
  response: express.Response
) => {
  try {
    sql

      .connect(config)
      .then((pool) => {
        const query = `
            SELECT * FROM ${StudClassEnum.NOM_TABLE}
            WHERE ${StudClassEnum.FK_CAMPUS} = '${request.params.idCampus}'
            `;
        return pool.request().query(query);
      })
      .then((result) => {
        response.status(200).send(result.recordset);
      });
  } catch (error) {
    response.status(400).send('Bad Request');
  }
};




export { newClassPOST, patchClassPOST, deleteClassPOST, getAllClassGET, getOneClassGET, getOneClassByPromoGET, getOneClassByCampusGET };
