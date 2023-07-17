import express from "express";
import { CoursEnum, CourseEnum } from "../../models/education/course-model";
import isId from "../../models/integer-model";
import { onlyLowercaseRegExp } from "../../Regex/string-regex";
import * as config from "../../config.json";
import sql from "mssql";
import {
  StudClassEnum,
  StudClassPOST,
  queryGetOneClassGET,
} from "../../models/education/student-class-model";
import { request } from "http";
import { EtudiantEnum } from "../../models/users/etudiant-model";

const newClassPOST = (req: express.Request, res: express.Response) => {
  try {
    const body = req.body;
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
        res.status(201).send("Class successfully created !");
      });
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};

const patchClassPOST = (req: express.Request, res: express.Response) => {
  try {
    const body = req.body;
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
            WHERE ${StudClassEnum.PK} = '${req.params.id}'
            `;
        return pool.request().query(query);
      })
      .then(() => {
        res.status(201).send("Class successfully updated !");
      });
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};

const deleteClassPOST = (req: express.Request, res: express.Response) => {
  try {
    const body = req.body;
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
            WHERE ${StudClassEnum.PK} = '${req.params.id}'
            `;
        return pool.request().query(query);
      })
      .then(() => {
        res.status(201).send("Class successfully deleted !");
      });
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};

const getAllClassGET = (req: express.Request, res: express.Response) => {
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
        res.status(200).send(result.recordset);
      });
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};

const getOneClassGET = (req: express.Request, res: express.Response) => {
  try {
    sql
      .connect(config)
      .then((pool) => {
        const query = queryGetOneClassGET(req.params.id);
        return pool.request().query(query);
      })
      .then((result) => {
        res.status(200).send(result.recordset);
      });
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};

const getOneClassByPromoGET = (req: express.Request, res: express.Response) => {
  try {
    sql
      .connect(config)
      .then((pool) => {
        const query = `

            SELECT * FROM ${StudClassEnum.NOM_TABLE}
            WHERE ${StudClassEnum.FK_PROMOTION} = '${req.params.id}'
            `;
        return pool.request().query(query);
      })
      .then((result) => {
        res.status(200).send(result.recordset);
      });
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};

const getOneClassByCampusGET = (
  req: express.Request,
  res: express.Response
) => {
  try {
    sql

      .connect(config)
      .then((pool) => {
        const query = `
            SELECT * FROM ${StudClassEnum.NOM_TABLE}
            WHERE ${StudClassEnum.FK_CAMPUS} = '${req.params.idCampus}'
            `;
        return pool.request().query(query);
      })
      .then((result) => {
        res.status(200).send(result.recordset);
      });
  } catch (error) {
    res.status(400).send("Bad Request");
  }
};

export {
  newClassPOST,
  patchClassPOST,
  deleteClassPOST,
  getAllClassGET,
  getOneClassGET,
  getOneClassByPromoGET,
  getOneClassByCampusGET,
};
