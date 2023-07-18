/**
 * I want a controller page that manage the presence of students in a êculiar course for sql database
 */
// Path: backend\controllers\education\presence-controller.ts
// Compare this snippet from backend\routes\education\student-class-route.ts:
import express from "express";
import sql from "mssql";
import * as config from "../../config.json";
import {
  PresencesBodyRequest,
  StudentPresence,
  queryNewPresencePOST,
  queryUpdatePresencePATCH,
  queryUpdatePresencePUT,
} from "../../models/education/presence-model";
import { isPresenceDataCoherent } from "../../utils/data-coherence-utils";
import { PresenceEnum } from "../../models/presence-model";
import { CoursEnum } from "../../models/education/course-model";
import { UtilisateurEnum } from "../../models/users/user-model";
import { StudClassEnum } from "../../models/education/student-class-model";
import { RoomEnum } from "../../models/infrastructure/room-model";
import { MatiereEnum } from "../../models/education/matiere-model";
import { EtudiantEnum } from "../../models/users/etudiant-model";

const updatePresencesPUT = (req: express.Request, res: express.Response) => {
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
              throw new Error("Data are incoherent !");
            }
          }
        );
      })
      .then(() => {
        res.status(200).json({ message: "Presence(s) successfully updated !" });
      })
      .catch((error: any) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const updatePresencesPATCH = (req: express.Request, res: express.Response) => {
  // A function that get value from the request body, create an sql query and update a row in the presence table
  try {
    const body = req.body;
    const idPresence: number = Number(req.params.idPresence);
    const presenceToPATCH = body;
    // Create a new row in the presence table
    sql
      .connect(config)
      .then((pool) => {
        if (!!isPresenceDataCoherent(presenceToPATCH)) {
          pool
            .request()
            .query(queryUpdatePresencePATCH(idPresence, presenceToPATCH));
        }
      })
      .then(() => {
        res.status(200).json({ message: "Presence(s) successfully updated !" });
      })
      .catch((error: any) => {
        console.log(error.message);
        res.status(400).json({ message: error.message });
      });
  } catch (error) {}
};

const getPresencesByStudentGET = (
  req: express.Request,
  res: express.Response
) => {
  try {
    const params = req.params;
    const idStudent: number = Number(params.idStudent);
    const queryGET = `
    SELECT 
    P.${PresenceEnum.PK} AS id_presence,
    P.${PresenceEnum.RETARD} AS en_retard,
    P.${PresenceEnum.ABSENT} AS est_absent,
    P.${PresenceEnum.SIGNE} AS a_signe,
    P.${PresenceEnum.FK_ETUDIANT} AS id_etudiant,
    C.${CoursEnum.PK},
    C.${CoursEnum.LIBELLE},
    C.${CoursEnum.DATE},
    C.${CoursEnum.DEBUT},
    C.${CoursEnum.FIN},

    U1.${UtilisateurEnum.PK} AS id_reprographe,
    U1.${UtilisateurEnum.NOM} AS nom_reprographe,
    U1.${UtilisateurEnum.PRENOM} AS prenom_reprographe,

    U2.${UtilisateurEnum.PK} AS id_intervenant,
    U2.${UtilisateurEnum.NOM} AS nom_intervenant,
    U2.${UtilisateurEnum.PRENOM} AS prenom_intervenant,
    U2.${UtilisateurEnum.EMAIL} AS email_intervenant,

    U3.${UtilisateurEnum.PK} AS id_attache_de_promotion,
    U3.${UtilisateurEnum.NOM} AS nom_attache_de_promotion,
    U3.${UtilisateurEnum.PRENOM} AS prenom_attache_de_promotion,
    U3.${UtilisateurEnum.EMAIL} AS email_attache_de_promotion,

    U4.${UtilisateurEnum.PK} AS id_responsable_pedagogique,
    U4.${UtilisateurEnum.NOM} AS nom_responsable_pedagogique,
    U4.${UtilisateurEnum.PRENOM} AS prenom_responsable_pedagogique,
    U4.${UtilisateurEnum.EMAIL} AS email_responsable_pedagogique,

    U5.${UtilisateurEnum.PK} AS id_user_etudiant,
    U5.${UtilisateurEnum.NOM} AS nom_etudiant,
    Cl.${StudClassEnum.LIBELLE},
    S.${RoomEnum.LIBELLE},
    M.${MatiereEnum.LIBELLE}
    FROM 
    ${PresenceEnum.NOM_TABLE} AS P
    LEFT JOIN ${CoursEnum.NOM_TABLE} C ON P.${PresenceEnum.FK_COURS} = C.${CoursEnum.PK}
    LEFT JOIN Etudiant E ON P.${PresenceEnum.FK_ETUDIANT} = E.${EtudiantEnum.PK}
    LEFT JOIN Reprographe R ON C.id_reprographe = R.id_reprographe
    LEFT JOIN Intervenant I ON C.id_intervenant = I.id_intervenant
    LEFT JOIN Attache_de_promotion AP ON C.id_attache_de_promotion = AP.id_attache_de_promotion
    LEFT JOIN Responsable_pedagogique RP ON C.id_responsable_pedagogique = RP.id_responsable_pedagogique
    LEFT JOIN Classe CL ON C.id_classe = CL.id_classe
    LEFT JOIN Salle S ON C.id_salle = S.id_salle
    LEFT JOIN Matiere M ON C.id_matiere = M.id_matiere
    LEFT JOIN Utilisateur U1 ON R.id_utilisateur = U1.id_utilisateur
    LEFT JOIN Utilisateur U2 ON I.id_utilisateur = U2.id_utilisateur
    LEFT JOIN Utilisateur U3 ON AP.id_utilisateur = U3.id_utilisateur
    LEFT JOIN Utilisateur U4 ON RP.id_utilisateur = U4.id_utilisateur
    LEFT JOIN Utilisateur U5 ON E.id_utilisateur = U5.id_utilisateur
    WHERE P.${PresenceEnum.FK_ETUDIANT} = ${idStudent}   
    `;
    sql.connect(config).then((pool) => {
      pool

        .request()
        .query(queryGET)
        .then((result) => {
          if (result) {
            res.status(200).send(result.recordset);
          } else {
            res.status(405).send("Unacceptable operation.");
          }
        })
        .catch((error) => {
          console.log(error.message);
          res.status(405).send("Unacceptable operation.");
        });
    });
  } catch (error) {
    res.status(405).send("Unacceptable operation.");
  }
};

const getPresencesByCourseGET = (
  req: express.Request,
  res: express.Response
) => {
  try {
    const params = req.params;
    const idCourse: number = Number(params.idCourse);

    const queryGET = `SELECT * FROM ${PresenceEnum.NOM_TABLE} WHERE ${PresenceEnum.FK_COURS} = ${idCourse}`;
    sql.connect(config).then((pool) => {
      pool
        .request()
        .query(queryGET)
        .then((result) => {
          if (result) {
            res.status(200).send(result.recordset);
          } else {
            res.status(405).send("Unacceptable operation.");
          }
        })
        .catch((error) => {
          res.status(405).send("Unacceptable operation.");
        });
    });
  } catch (error) {
    res.status(405).send("Unacceptable operation.");
  }
};

const deletePresenceDELETE = (req: express.Request, res: express.Response) => {
  try {
    const params = req.params;
    const idPresence: number = Number(params.idPresence);
    const queryDELETE = `DELETE FROM ${PresenceEnum.NOM_TABLE} WHERE ${PresenceEnum.PK} = ${idPresence}`;
    sql.connect(config).then((pool) => {
      pool
        .request()
        .query(queryDELETE)
        .then((result) => {
          if (result) {
            res.status(200).send("Presence successfully deleted !");
          } else {
            res.status(405).send("Unacceptable operation.");
          }
        })
        .catch((error) => {
          console.log(error.message);
          res.status(405).send("Unacceptable operation.");
        });
    });
  } catch (error) {
    res.status(405).send("Unacceptable operation.");
  }
};

export {
  updatePresencesPUT,
  getPresencesByStudentGET,
  getPresencesByCourseGET,
  updatePresencesPATCH as updatePresencesPatch,
  deletePresenceDELETE,
};
