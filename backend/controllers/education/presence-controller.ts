/**
 * I want a controller page that manage the presence of students in a êculiar course for sql database
 */
// Path: backend\controllers\education\presence-controller.ts
// Compare this snippet from backend\routes\education\student-class-route.ts:
import express from 'express';
import sql from 'mssql';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin } from '../../middleware/roles-middleware';
import * as config from '../../config.json';
import {
  PresencesBodyRequest,
  StudentPresence,
  queryNewPresencePOST,
  queryUpdatePresencePUT,
} from '../../models/education/presence-model';
import { isPresenceDataCoherent } from '../../utils/data-coherence-utils';

const updatePresencesPUT = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // A function that get value from the request body, create an sql query and create a new row in the presence table
  try {
    const body = req.body;
    const presencesToPUT: PresencesBodyRequest = {
      idCourse: body.idCourse,
      listStudents: body.listStudents,
    };
    // Create a new row in the presence table
    sql
      .connect(config)
      .then((pool) => {
        presencesToPUT.listStudents.forEach(
          (studentPresence: StudentPresence) => {
            if (!!isPresenceDataCoherent(studentPresence)) {
              pool
                .request()
                .query(
                  queryUpdatePresencePUT(
                    presencesToPUT.idCourse,
                    studentPresence
                  )
                );
            } else {
              throw new Error('Data are incoherent !');
            }
          }
        );
      })
      .then(() => {
        res.status(200).json({ message: 'Presence(s) successfully updated !' });
      })
      .catch((error: any) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const updatePresencePUT = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // A function that get value from the request body, create an sql query and update a row in the presence table
  try {
    const body = req.body;
    const presencesToPUT: PresencesBodyRequest = {
      idCourse: body.idCourse,
      listStudents: body.listStudents,
    };
    // Create a new row in the presence table
    // sql
    //   .connect(config)
  } catch (error) {}
};

export { updatePresencesPUT };
