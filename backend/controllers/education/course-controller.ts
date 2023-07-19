import express from "express";
import {
  CoursEnum,
  CourseEnum,
  CoursePageGET,
  coursesUserFunctionIdGETQuery,
  coursesUserGETQuery,
  queryCoursesGET,
  queryDeleteCourseAndPresencesDELETE,
  queryGetCourseAndStudentsGET,
  queryNewCoursesPOST,
  queryPatchCoursePATCH,
} from "../../models/education/course-model";
import isId from "../../models/integer-model";
import { onlyLowercaseRegExp } from "../../Regex/string-regex";
import * as config from "../../config.json";
import sql from "mssql";
import { FonctionEnum, FonctionType } from "../../models/users/user-model";
import { EtudiantEnum } from "../../models/users/etudiant-model";
import { AttachePromotionEnum } from "../../models/users/attache-promotion-model";
import { ReprographeEnum } from "../../models/users/reprographe-model";
import { IntervenantEnum } from "../../models/users/intervenant";
import { ResponsablePedagogiqueEnum } from "../../models/users/resp-pedago-model";
import { RolesEnum } from "../../models/users/roles-model";
import { allStudentsOfACourseGETQuery } from "../../models/education/course-model";
import { queryNewPresencePOST } from "../../models/education/presence-model";

const newCoursePOST = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const body = request.body;
  const startCourse = new Date(body.startCourse).toISOString();
  const endCourse = new Date(body.endCourse).toISOString();
  const courseDate = new Date(body.courseDate).toISOString();
  const allIdsToTest: number[] = [
    body.idTeacher,
    body.idRespFormation,
    body.idAttacheFormation,
    body.idReprographe,
    body.idClassRoom,
    body.idCourseSubject,
    body.idClass,
  ];
  if (isId(allIdsToTest) && onlyLowercaseRegExp([body.courseLabel])) {
    const sqlQueryBodyData: CourseEnum = {
      courseLabel: body.courseLabel,
      courseDate,
      startCourse,
      endCourse,
      idTeacher: body.idTeacher,
      idRespPedago: body.idRespPedago,
      idAttachePromotion: body.idAttachePromotion,
      idReprographe: body.idReprographe,
      idClassRoom: body.idClassRoom,
      idCourseSubject: body.idCourseSubject,
      idClass: body.idClass,
    };

    try {
      const queryPOSTCourses = queryNewCoursesPOST(sqlQueryBodyData);
      sql
        .connect(config)
        .then((pool) => {
          return {
            result: pool.request().query(queryPOSTCourses),
            poolValue: pool,
          };
        })
        .then(async (returnedValueWhenInserted) => {
          if ((await returnedValueWhenInserted.result).rowsAffected[0] === 1) {
            returnedValueWhenInserted.poolValue
              .request()
              .query(
                queryGetCourseAndStudentsGET(
                  (await returnedValueWhenInserted.result).recordset[0].id_cours
                )
              )
              .then((result) => {
                result.recordset.forEach((element) => {
                  returnedValueWhenInserted.poolValue
                    .request()
                    .query(
                      queryNewPresencePOST(element.idCours, element.idEtudiant)
                    );
                });
              })
              .then(() => {
                response
                  .status(201)
                  .send({ message: "New course was successfully created !" });
              });
          } else {
            throw new Error("Unacceptable operation.");
          }
        });
    } catch (error) {
      response.status(405).send(error);
    }
  } else {
    response.status(405).send("Unacceptable operation.");
  }
};

const coursesPagesGET = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params = request.params;

    const sqlQueryBodyData: CoursePageGET = {
      startDate: params.startDate,
      numberOfDays: Number(params.numberOfDays),
      idUser: Number(params.idUser),
    };
    sql
      .connect(config)
      .then((pool) => {
        const queryRole = coursesUserGETQuery(sqlQueryBodyData.idUser);
        return { queryRole, pool };
      })
      .then((coursesUserGETQueryResult) => {
        coursesUserGETQueryResult.pool
          .request()
          .query(coursesUserGETQueryResult.queryRole)
          .then((result) => {
            const userConcernedCourses = userFonctionTable(
              result.recordset[0][RolesEnum.LIBELLE],
              sqlQueryBodyData.idUser,
              sqlQueryBodyData.startDate,
              sqlQueryBodyData.numberOfDays
            );
            return userConcernedCourses;
          })
          .then((userConcernedCoursesQuery) => {
            return coursesUserGETQueryResult.pool
              .request()
              .query(userConcernedCoursesQuery);
          })
          .then((result: any) => {
            response.status(200).send(result.recordsets[0]);
          });
      });
  } catch (error) {
    response.status(400).send(error);
  }
};

const coursesAllPagesGET = (
  request: express.Request,
  response: express.Response
) => {
  try {
    const params = request.params;

    const startDate = params.startDate;
    const numberOfDays = Number(params.numberOfDays);

    sql.connect(config).then((pool) => {
      const query = queryCoursesGET(startDate, numberOfDays);
      console.log(query);
      pool
        .request()
        .query(query)
        .then((result: any) => {
          return response.status(200).send(result.recordsets[0]);
        })
        .catch((error) => {
          console.log(error.message);
          return response.status(400).send("Bad request");
        });
    });
  } catch (error) {
    return response.status(400).send(error);
  }
};
const courseByIdGET = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const params = req.params;
    sql.connect(config).then((pool) => {
      const query = `
      SELECT * FROM ${CoursEnum.NOM_TABLE}
      WHERE ${CoursEnum.PK} = ${params.idCourse}
      `;
      pool
        .request()
        .query(query)
        .then((result) => {
          if (result) {
            return res.status(200).send(result.recordset);
          } else {
            return res.status(405).send("Unacceptable operation.");
          }
        })
        .catch((error) => {
          return res.status(405).send("Unacceptable operation.");
        });
    });
  } catch (error) {
    return res.status(400).send("Bad Request");
  }
};

const userFonctionTable = (
  roleUser: FonctionType,
  idUser: number,
  startDate: string,
  numberOfDays: number
): string => {
  switch (roleUser) {
    case FonctionEnum.ETUDIANT:
      return coursesUserFunctionIdGETQuery(
        EtudiantEnum.FK_CLASSE,
        EtudiantEnum.NOM_TABLE,
        EtudiantEnum.FK_UTILISATEUR,
        idUser,
        startDate,
        numberOfDays
      );
    case FonctionEnum.ATTACHE_PROMO:
      return coursesUserFunctionIdGETQuery(
        AttachePromotionEnum.PK,
        AttachePromotionEnum.NOM_TABLE,
        AttachePromotionEnum.FK_UTILISATEUR,
        idUser,
        startDate,
        numberOfDays
      );
    case FonctionEnum.REPROGRAPHE:
      return coursesUserFunctionIdGETQuery(
        ReprographeEnum.PK,
        ReprographeEnum.NOM_TABLE,
        ReprographeEnum.FK_UTILISATEUR,
        idUser,
        startDate,
        numberOfDays
      );
    case FonctionEnum.INTERVENANT:
      return coursesUserFunctionIdGETQuery(
        IntervenantEnum.PK,
        IntervenantEnum.NOM_TABLE,
        IntervenantEnum.FK_UTILISATEUR,
        idUser,
        startDate,
        numberOfDays
      );
    case FonctionEnum.RESPONSABLE_PEDA:
      return coursesUserFunctionIdGETQuery(
        ResponsablePedagogiqueEnum.PK,
        ResponsablePedagogiqueEnum.NOM_TABLE,
        ResponsablePedagogiqueEnum.FK_UTILISATEUR,
        idUser,
        startDate,
        numberOfDays
      );
    // case ADMIN
    default:
      throw new Error("");
      break;
  }
};

// get all students that asisted to a course
const coursesStudentGET = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const params = request.params;
    sql
      .connect(config)
      .then((pool) => {
        const sqlQueryBodyData = allStudentsOfACourseGETQuery(
          Number(params.idCourse)
        );
        return { sqlQueryBodyData, pool };
      })
      .then((courseStudentsGETQueryResult) => {
        courseStudentsGETQueryResult.pool
          .request()
          .query(courseStudentsGETQueryResult.sqlQueryBodyData)
          .then((result) => {
            return result.recordset;
          })
          .then((resultList) => {
            return response.status(200).send(resultList);
          });
      });
  } catch (error) {
    response.status(400).send(error);
  }
};

const deleteCourseDELETE = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const params = request.params;
    sql
      .connect(config)
      .then((pool) => {
        const sqlDeleteQueryBodyData = queryDeleteCourseAndPresencesDELETE(
          Number(params.idCourse)
        );
        return { sqlDeleteQueryBodyData, pool };
      })
      .then((courseStudentsGETQueryResult) => {
        courseStudentsGETQueryResult.pool
          .request()
          .query(courseStudentsGETQueryResult.sqlDeleteQueryBodyData)
          .then((result) => {
            return response.status(200).send(result.recordset);
          })
          .catch((error) => {
            return response.status(400).send("Bad request");
          });
      })
      .catch((error) => {
        return response.status(400).send("Bad request");
      });
  } catch (error) {
    return response.status(400).send("Bad request");
  }
};

const patchCoursePATCH = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const params = request.params;
    const body = request.body;
    sql
      .connect(config)
      .then((pool) => {
        const sqlDeleteQuery = queryPatchCoursePATCH(
          Number(params.idCourse),
          body
        );
        return { sqlDeleteQuery, pool };
      })
      .then((courseStudentsGETQueryResult) => {
        courseStudentsGETQueryResult.pool
          .request()
          .query(courseStudentsGETQueryResult.sqlDeleteQuery)
          .then((result) => {
            return response.status(200).send(result.recordset);
          })
          .catch((error) => {
            console.log(error.message);
            return response.status(400).send("Bad request");
          });
      })
      .catch((error) => {
        console.log(error.message);
        return response.status(400).send("Bad request");
      });
  } catch (error) {
    return response.status(400).send("Bad request");
  }
};

export {
  newCoursePOST,
  coursesPagesGET,
  coursesStudentGET,
  deleteCourseDELETE,
  courseByIdGET,
  patchCoursePATCH,
  coursesAllPagesGET,
};
