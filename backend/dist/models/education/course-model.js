"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allStudentsOfACourseGETQuery = exports.coursesPagesGETQuery = exports.coursesUserFunctionIdGETQuery = exports.coursesUserGETQuery = exports.CoursEnum = void 0;
const room_model_1 = require("../infrastructure/room-model");
const etudiant_model_1 = require("../users/etudiant-model");
const roles_model_1 = require("../users/roles-model");
const user_model_1 = require("../users/user-model");
const matiere_model_1 = require("./matiere-model");
const student_class_model_1 = require("./student-class-model");
var CoursEnum;
(function (CoursEnum) {
    CoursEnum["NOM_TABLE"] = "Cours";
    CoursEnum["PK"] = "id_cours";
    CoursEnum["LIBELLE"] = "libelle_cours";
    CoursEnum["DATE"] = "date_cours";
    CoursEnum["DEBUT"] = "heure_debut_cours";
    CoursEnum["FIN"] = "heure_fin_cours";
    CoursEnum["FK_INTERVENANT"] = "id_intervenant";
    CoursEnum["FK_RESP_PEDAGO"] = "id_responsable_pedagogique";
    CoursEnum["FK_ATTACH_PROMO"] = "id_attache_de_promotion";
    CoursEnum["FK_REPROGRAPHE"] = "id_reprographe";
    CoursEnum["FK_SALLE"] = "id_salle";
    CoursEnum["FK_MATIERE"] = "id_matiere";
    CoursEnum["FK_CLASSE"] = "id_classe";
})(CoursEnum || (exports.CoursEnum = CoursEnum = {}));
const coursesUserGETQuery = (idUser) => {
    const query = `
  SELECT ${roles_model_1.RolesEnum.NOM_TABLE}.${roles_model_1.RolesEnum.LIBELLE} FROM ${user_model_1.UtilisateurEnum.NOM_TABLE}
  LEFT JOIN ${roles_model_1.RolesEnum.NOM_TABLE} ON ${roles_model_1.RolesEnum.NOM_TABLE}.${roles_model_1.RolesEnum.PK} = ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.FK_ROLE_UTILISATEUR}
  WHERE ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.PK} = ${idUser}`;
    return query;
};
exports.coursesUserGETQuery = coursesUserGETQuery;
const coursesUserFunctionIdGETQuery = (targetIdInTableForFKCourse, targetTableName, targetFKIdUser, idUser, startDate, numberOfDays) => {
    const query = `
  DECLARE @StartDate DATE = '${startDate}';
  DECLARE @EndDate DATE = DATEADD(DAY, ${numberOfDays}, @StartDate);

  SELECT
  C.${CoursEnum.PK},
  C.${CoursEnum.LIBELLE},
  C.${CoursEnum.DATE},
  C.${CoursEnum.DEBUT},
  C.${CoursEnum.FIN},
  U1.${user_model_1.UtilisateurEnum.PK} AS id_reprographe,
  U1.${user_model_1.UtilisateurEnum.NOM} AS nom_reprographe,
  U1.${user_model_1.UtilisateurEnum.PRENOM} AS prenom_reprographe,
  U2.${user_model_1.UtilisateurEnum.PK} AS id_intervenant,
  U2.${user_model_1.UtilisateurEnum.NOM} AS nom_intervenant,
  U2.${user_model_1.UtilisateurEnum.PRENOM} AS prenom_intervenant,
  U3.${user_model_1.UtilisateurEnum.PK} AS id_attache_de_promotion,
  U3.${user_model_1.UtilisateurEnum.NOM} AS nom_attache_de_promotion,
  U3.${user_model_1.UtilisateurEnum.PRENOM} AS prenom_attache_de_promotion,
  U4.${user_model_1.UtilisateurEnum.PK} AS id_responsable_pedagogique,
  U4.${user_model_1.UtilisateurEnum.NOM} AS nom_responsable_pedagogique,
  U4.${user_model_1.UtilisateurEnum.NOM} AS prenom_responsable_pedagogique,
  Cl.${student_class_model_1.StudClassEnum.LIBELLE},
  S.${room_model_1.RoomEnum.LIBELLE},
  M.${matiere_model_1.MatiereEnum.LIBELLE}
  FROM ${CoursEnum.NOM_TABLE} AS C
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
  WHERE C.${targetIdInTableForFKCourse} IN (
    SELECT ${targetIdInTableForFKCourse} FROM ${targetTableName}
    WHERE ${targetFKIdUser} = ${idUser}
  ) AND ${CoursEnum.DATE} BETWEEN @StartDate AND @EndDate;

  `;
    return query;
};
exports.coursesUserFunctionIdGETQuery = coursesUserFunctionIdGETQuery;
const coursesPagesGETQuery = (startDate, numberOfDays) => {
    const query = `
  DECLARE @StartDate DATE = '${startDate}';
  DECLARE @EndDate DATE = DATEADD(DAY, ${numberOfDays}, @StartDate);

  SELECT *
  FROM ${CoursEnum.NOM_TABLE}
  WHERE ${CoursEnum.DATE} BETWEEN @StartDate AND @EndDate;
  `;
    return query;
};
exports.coursesPagesGETQuery = coursesPagesGETQuery;
// Function that returns an SQL QUERY to get all students of a specific course
const allStudentsOfACourseGETQuery = (idCourse) => {
    const query = `
  SELECT
  ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.PK},
  ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.NOM},
  ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.PRENOM},
  ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.EMAIL}
  FROM ${CoursEnum.NOM_TABLE}
  LEFT JOIN ${etudiant_model_1.EtudiantEnum.NOM_TABLE} ON ${CoursEnum.NOM_TABLE}.${CoursEnum.FK_CLASSE} = ${etudiant_model_1.EtudiantEnum.NOM_TABLE}.${etudiant_model_1.EtudiantEnum.FK_CLASSE}
  LEFT JOIN ${user_model_1.UtilisateurEnum.NOM_TABLE} ON ${etudiant_model_1.EtudiantEnum.NOM_TABLE}.${etudiant_model_1.EtudiantEnum.FK_UTILISATEUR} = ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.PK}
  WHERE ${CoursEnum.NOM_TABLE}.${CoursEnum.PK} = ${idCourse};
  `;
    return query;
};
exports.allStudentsOfACourseGETQuery = allStudentsOfACourseGETQuery;
//# sourceMappingURL=course-model.js.map