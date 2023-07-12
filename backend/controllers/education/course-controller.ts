import express, { query } from 'express';
import {
  CoursEnum,
  CoursePOST,
  CoursePageGET,
  coursesUserFunctionIdGETQuery,
  coursesUserGETQuery,
} from '../../models/education/course-model';
import isId from '../../models/integer-model';
import { onlyLowercaseRegExp } from '../../Regex/string-regex';
import * as config from '../../config.json';
import sql from 'mssql';
import { FonctionEnum, FonctionType } from '../../models/users/user-model';
import { EtudiantEnum } from '../../models/users/etudiant-model';
import { AttachePromotionEnum } from '../../models/users/attache-promotion-model';
import { ReprographeEnum } from '../../models/users/reprographe-model';
import { IntervenantEnum } from '../../models/users/intervenant';
import { ResponsablePedagogiqueEnum } from '../../models/users/resp-pedago-model';
import { RolesEnum } from '../../models/users/roles-model';
import { allStudentsOfACourseGETQuery } from '../../models/education/course-model';

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
    const sqlQueryBodyData: CoursePOST = {
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
      const queryPOSTCourses = `
        INSERT INTO ${CoursEnum.NOM_TABLE} 
        (${CoursEnum.LIBELLE}, 
            ${CoursEnum.DATE}, 
            ${CoursEnum.DEBUT}, 
            ${CoursEnum.FIN}, 
            ${CoursEnum.FK_INTERVENANT}, 
            ${CoursEnum.FK_RESP_PEDAGO}, 
            ${CoursEnum.FK_ATTACH_PROMO}, 
            ${CoursEnum.FK_REPROGRAPHE},
            ${CoursEnum.FK_SALLE}, 
            ${CoursEnum.FK_MATIERE}, 
            ${CoursEnum.FK_CLASSE})
        VALUES
        ('${sqlQueryBodyData.courseLabel}', 
        '${sqlQueryBodyData.courseDate}', 
        '${sqlQueryBodyData.startCourse}', 
        '${sqlQueryBodyData.endCourse}', 
        ${sqlQueryBodyData.idTeacher}, 
        ${sqlQueryBodyData.idRespPedago}, 
        ${sqlQueryBodyData.idAttachePromotion}, 
        ${sqlQueryBodyData.idReprographe}, 
        ${sqlQueryBodyData.idClassRoom}, 
        ${sqlQueryBodyData.idCourseSubject}, 
        ${sqlQueryBodyData.idClass})
        `;
      sql
        .connect(config)
        .then((pool) => {
          return pool.request().query(queryPOSTCourses);
        })
        .then((result) => {
          if (result) {
            response.status(201).send('New course was successfully created !');
          } else {
            throw new Error('Unacceptable operation.');
          }
        });
    } catch (error) {
      response.status(405).send(error);
    }
  } else {
    response.status(405).send('Unacceptable operation.');
  }
};

const coursesPagesGET = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
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
      throw new Error('');
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
            return result.recordset[0];
          })
          .then((resultList) => {
            return response.status(200).send(resultList);
          });
      });
  } catch (error) {
    response.status(400).send(error);
  }
};

export { newCoursePOST, coursesPagesGET, coursesStudentGET };
