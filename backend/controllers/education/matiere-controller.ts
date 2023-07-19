import express from "express";
import { CoursEnum, CourseEnum } from "../../models/education/course-model";
import isId from "../../models/integer-model";
import { onlyLowercaseRegExp } from "../../Regex/string-regex";
import * as config from "../../config.json";
import sql from "mssql";
import {
  MatiereColumns,
  MatiereEnum,
  MatiereType,
  matiereColumns,
} from "../../models/education/matiere-model";
import { UtilisateurEnum } from "../../models/users/user-model";
import { SchoolEnum } from "../../models/infrastructure/school-model";

const newMatierePOST = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const body = request.body;
    const sqlQueryBody: MatiereType = {
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
        response.status(201).send("Matiere successfully created !");
      });
  } catch (error) {
    response.status(400).send("Bad Request");
  }
};

const getMatiereByIdGET = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const idMatiere = Number(request.params.idMatiere);
    if (!isId([idMatiere])) {
      throw new Error("Bad Request");
    }
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            SELECT *
            FROM ${MatiereEnum.NOM_TABLE}
            WHERE ${MatiereEnum.PK} = ${idMatiere}
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
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
};

const getMatierePaginatedGET = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params: any = request.params;
    const page: number = Number(params.pageNumber);
    const rowsNumber: number = Number(params.rowsNumber);
    const orderBy: MatiereColumns = params.orderBy;
    if (!isId([page, rowsNumber])) {
      throw new Error("Bad Request");
    }
    sql
      .connect(config)
      .then((pool) => {
        const query = `

        DECLARE @PageNumber AS INT
        DECLARE @PageSize AS INT
        SET @PageNumber=${page}
        SET @PageSize=${rowsNumber}

        SELECT
        M.${MatiereEnum.PK},
        M.${MatiereEnum.LIBELLE},
        M.${MatiereEnum.FK_ECOLE},
        M.${MatiereEnum.FK_INTERVENANT},
        E.${SchoolEnum.LIBELLE},
        U.${UtilisateurEnum.NOM},
        U.${UtilisateurEnum.PRENOM}
        FROM ${MatiereEnum.NOM_TABLE} M
        LEFT JOIN ${SchoolEnum.NOM_TABLE} E ON M.${MatiereEnum.FK_ECOLE} = E.${SchoolEnum.PK}
        LEFT JOIN ${UtilisateurEnum.NOM_TABLE} U ON M.${MatiereEnum.FK_INTERVENANT} = U.${UtilisateurEnum.PK}
        ORDER BY M.${matiereColumns[orderBy]} ASC
        OFFSET (@PageNumber - 1) * @PageSize ROWS
        FETCH NEXT @PageSize ROWS ONLY;
        ;`;
        return pool
          .request()
          .query(query)
          .catch((error) => {
            throw new Error(error);
          });
      })
      .then((result) => {
        return response.status(200).json(result.recordset);
      })
      .catch((error) => {
        console.log(error.message);
        return response.status(400).send("Bad Request");
      });
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
};

const patchMatierePATCH = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const body = request.body;
    const idMatiere = Number(request.params.idMatiere);
    if (!isId([idMatiere])) {
      throw new Error("Bad Request");
    }
    const sqlQueryBody: MatiereType = {
      libelleMatiere: body.libelleMatiere,
      idEcole: body.idEcole,
      idIntervenant: body.idIntervenant,
    };
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            UPDATE ${MatiereEnum.NOM_TABLE}
            SET ${MatiereEnum.LIBELLE} = '${sqlQueryBody.libelleMatiere}',
            ${MatiereEnum.FK_ECOLE} = ${sqlQueryBody.idEcole},
            ${MatiereEnum.FK_INTERVENANT} = ${sqlQueryBody.idIntervenant}
            WHERE ${MatiereEnum.PK} = ${idMatiere}
            `;
        return pool
          .request()
          .query(query)
          .catch((error) => {
            throw new Error("Bad Request");
          });
      })
      .then(() => {
        response.status(200).send("Matiere successfully updated !");
      })
      .catch((error) => {
        return response.status(400).send("Bad Request");
      });
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
};

const deleteMatiereDELETE = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const idMatiere = Number(request.params.idMatiere);
    if (!isId([idMatiere])) {
      throw new Error("Bad Request");
    }
    sql
      .connect(config)
      .then((pool) => {
        const query = `
        DELETE FROM ${MatiereEnum.NOM_TABLE}
        WHERE ${MatiereEnum.PK} = ${idMatiere}
        `;
        return pool
          .request()
          .query(query)
          .catch((error) => {
            throw new Error("Bad Request");
          });
      })
      .then(() => {
        response.status(200).send("Matiere successfully deleted !");
      })
      .catch((error) => {
        return response.status(405).send("Unacceptable operation.");
      });
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
};

export {
  newMatierePOST,
  patchMatierePATCH,
  getMatiereByIdGET,
  getMatierePaginatedGET,
  deleteMatiereDELETE
};
