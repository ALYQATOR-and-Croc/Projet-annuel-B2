import express from "express";
import {
  SchoolEnum,
  SchoolType,
} from "../../models/infrastructure/school-model";
import * as config from "../../config.json";
import sql from "mssql";
import isId from "../../models/integer-model";

const newSchoolPOST = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const body = request.body;
    const sqlQueryData: SchoolType = {
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
      .catch((error) => {
        return response.status(400).send("Bad Request");
      })
      .then(() => {
        return response.status(201).send("School Successfully created");
      })
      .catch((error) => {
        return response.status(400).send("Bad Request");
      });
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
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
        return response.status(200).send(result.recordset);
      } else {
        return response.status(405).send("Unacceptable operation.");
      }
    })
    .catch((error) => {
      return response.status(405).send("Unacceptable operation.");
    });
};

const getSchoolByIdGET = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const idSchool = Number(request.params.idSchool);
  if (!isId([idSchool])) {
    throw new Error("Bad Request");
  }
  sql
    .connect(config)
    .then((pool) => {
      const query = `
            SELECT * FROM ${SchoolEnum.NOM_TABLE}
            WHERE ${SchoolEnum.PK} = ${idSchool}
            `;
      return pool
        .request()
        .query(query)
        .catch((error) => {
          throw new Error("Bad Request");
        })
        .then((result) => {
          return response.status(200).json(result.recordset);
        })
        .catch((error) => {
          return response.status(400).send("Bad Request");
        });
    })
    .catch((error) => {
      return response.status(400).send("Bad Request");
    });
};

const patchSchoolPATCH = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const body = request.body;
  const params = request.params;
  const sqlQueryData: SchoolType = {
    libelleEcole: body.libelleEcole,
    domaineEcole: body.domaineEcole,
  };
  const idSchool = Number(params.idSchool);
  if (!isId([idSchool])) {
    throw new Error("Bad Request");
  }
  sql
    .connect(config)
    .then((pool) => {
      const query = `
            UPDATE ${SchoolEnum.NOM_TABLE}
            SET ${SchoolEnum.LIBELLE} = '${sqlQueryData.libelleEcole}', ${SchoolEnum.DOMAINE} = '${sqlQueryData.domaineEcole}'
            WHERE ${SchoolEnum.PK} = ${idSchool}
            `;
      return pool.request().query(query);
    })
    .then(() => {
      return response.status(200).send("School successfully updated !");
    })
    .catch((error) => {
      return response.status(400).send("Bad Request");
    });
};

const deleteSchoolDELETE = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const params = request.params;
    const idSchool = Number(params.idSchool);
    if (!isId([idSchool])) {
      throw new Error("Bad Request");
    }
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            DELETE FROM ${SchoolEnum.NOM_TABLE}
            WHERE ${SchoolEnum.PK} = ${idSchool}
            `;
        return pool
          .request()
          .query(query)
          .then(() => {
            return response.status(200).send("School successfully deleted !");
          })
          .catch((error) => {
            console.log(error.message);
            return response.status(405).send("Unacceptable operation.");
          });
      })
      .catch((error) => {
        console.log(error.message);
        return response.status(405).send("Unacceptable operation.");
      });
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
};

export {
  newSchoolPOST,
  getSchoolGET,
  getSchoolByIdGET,
  patchSchoolPATCH,
  deleteSchoolDELETE,
};
