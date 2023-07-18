import express from "express";
import {
  CampusEnum,
  CampusPOST,
} from "../../models/infrastructure/campus-model";
import * as config from "../../config.json";
import sql from "mssql";
import isId from "../../models/integer-model";

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
        return response.status(201).send("Campus Successfully created");
      });
  } catch (error) {
    return response.status(400);
  }
};

const getCampusGET = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    sql

      .connect(config)
      .then((pool) => {
        const query = `
            SELECT * FROM ${CampusEnum.NOM_TABLE}
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
  } catch (error) {
    return response.status(405).send("Unacceptable operation.");
  }
};

const patchCampusPATCH = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const body = request.body;
    const params = request.params;
    const idCampus = Number(params.idCampus);
    if (!isId([idCampus])) {
      throw new Error("Bad Request");
    }
    const sqlQueryData: CampusPOST = {
      libelleCampus: body.libelleCampus,
      adresseCampus: body.adresseCampus,
      codePostalCampus: body.codePostalCampus,
    };
    sql.connect(config).then((pool) => {
      const query = `
            UPDATE ${CampusEnum.NOM_TABLE}
            SET ${CampusEnum.LIBELLE} = '${sqlQueryData.libelleCampus}', ${CampusEnum.ADRESSE} = '${sqlQueryData.adresseCampus}', ${CampusEnum.CODEPOSTAL} = '${sqlQueryData.codePostalCampus}'
            WHERE ${CampusEnum.PK} = ${idCampus}
            `;
      return pool
        .request()
        .query(query)
        .then((result) => {
          if (result) {
            return response.status(200).send("Campus successfully updated");
          } else {
            return response.status(405).send("Unacceptable operation.");
          }
        })
        .catch((error) => {
          return response.status(405).send("Unacceptable operation.");
        });
    });
  } catch (error) {
    return response.status(405).send("Unacceptable operation.");
  }
};

const deleteCampusDELETE = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const params = request.params;
    const idCampus = Number(params.idCampus);
    if (!isId([idCampus])) {
      throw new Error("Bad Request");
    }
    sql.connect(config).then((pool) => {
      const query = `
            DELETE FROM ${CampusEnum.NOM_TABLE}
            WHERE ${CampusEnum.PK} = ${idCampus}
            `;
      return pool

        .request()
        .query(query)
        .then((result) => {
          if (result) {
            return response.status(200).send("Campus successfully deleted");
          } else {
            return response.status(405).send("Unacceptable operation.");
          }
        })
        .catch((error) => {
          console.log(error.message);
          return response.status(405).send("Unacceptable operation.");
        });
    });
  } catch (error) {
    return response.status(400).send("Bad request.");
  }
};

export { newCampusPOST, getCampusGET, patchCampusPATCH, deleteCampusDELETE };
