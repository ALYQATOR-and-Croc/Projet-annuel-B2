import { response } from "express";
import { RoomEnum } from "../infrastructure/room-model";
import { PresenceEnum } from "../presence-model";
import { EtudiantEnum } from "../users/etudiant-model";
import { IntervenantEnum } from "../users/intervenant";
import { RolesEnum } from "../users/roles-model";
import { UtilisateurEnum } from "../users/user-model";
import { MatiereEnum } from "./matiere-model";
import { PresenceModel } from "./presence-model";
import { PromotionEnum } from "./promotion-model";
import { StudClassEnum } from "./student-class-model";

export interface CourseEnum {
  courseLabel: string;
  courseDate: string;
  startCourse: string;
  endCourse: string;
  idTeacher: number;
  idRespPedago: number;
  idAttachePromotion: number;
  idReprographe: number;
  idClassRoom: number;
  idCourseSubject: number;
  idClass: number;
}

export enum CoursEnum {
  NOM_TABLE = "Cours",
  PK = "id_cours",
  LIBELLE = "libelle_cours",
  DATE = "date_cours",
  DEBUT = "heure_debut_cours",
  FIN = "heure_fin_cours",
  FK_INTERVENANT = "id_intervenant",
  FK_RESP_PEDAGO = "id_responsable_pedagogique",
  FK_ATTACH_PROMO = "id_attache_de_promotion",
  FK_REPROGRAPHE = "id_reprographe",
  FK_SALLE = "id_salle",
  FK_MATIERE = "id_matiere",
  FK_CLASSE = "id_classe",
}

export interface CoursePageGET {
  startDate: string;
  numberOfDays: number;
  idUser: number;
}

export const coursesUserGETQuery = (idUser: number): string => {
  const query = `
  SELECT ${RolesEnum.NOM_TABLE}.${RolesEnum.LIBELLE} FROM ${UtilisateurEnum.NOM_TABLE}
  LEFT JOIN ${RolesEnum.NOM_TABLE} ON ${RolesEnum.NOM_TABLE}.${RolesEnum.PK} = ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.FK_ROLE_UTILISATEUR}
  WHERE ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.PK} = ${idUser}`;
  return query;
};

export const coursesUserFunctionIdGETQuery = (
  targetIdInTableForFKCourse: string,
  targetTableName: string,
  targetFKIdUser: string,
  idUser: number,
  startDate: string,
  numberOfDays: number
): string => {
  const query = `
  DECLARE @StartDate DATE = '${startDate}';
  DECLARE @EndDate DATE = DATEADD(DAY, ${numberOfDays}, @StartDate);

  SELECT
  C.${CoursEnum.PK},
  C.${CoursEnum.LIBELLE},
  C.${CoursEnum.DATE},
  C.${CoursEnum.DEBUT},
  C.${CoursEnum.FIN},
  C.${CoursEnum.FK_INTERVENANT} AS id_intervenant,
  C.${CoursEnum.FK_ATTACH_PROMO} AS id_attache_de_promotion,
  C.${CoursEnum.FK_REPROGRAPHE} AS id_reprographe,
  C.${CoursEnum.FK_RESP_PEDAGO} AS id_responsable_pedagogique,
  U1.${UtilisateurEnum.PK} AS id_user_reprographe,
  U1.${UtilisateurEnum.NOM} AS nom_reprographe,
  U1.${UtilisateurEnum.PRENOM} AS prenom_reprographe,
  U2.${UtilisateurEnum.PK} AS id_user_intervenant,
  U2.${UtilisateurEnum.NOM} AS nom_intervenant,
  U2.${UtilisateurEnum.PRENOM} AS prenom_intervenant,
  U3.${UtilisateurEnum.PK} AS id_user_attache_de_promotion,
  U3.${UtilisateurEnum.NOM} AS nom_attache_de_promotion,
  U3.${UtilisateurEnum.PRENOM} AS prenom_attache_de_promotion,
  U4.${UtilisateurEnum.PK} AS id_user_responsable_pedagogique,
  U4.${UtilisateurEnum.NOM} AS nom_responsable_pedagogique,
  U4.${UtilisateurEnum.PRENOM} AS prenom_responsable_pedagogique,
  Cl.${StudClassEnum.LIBELLE},
  Cl.${StudClassEnum.PK},
  S.${RoomEnum.LIBELLE},
  S.${RoomEnum.PK},
  M.${MatiereEnum.LIBELLE},
  M.${MatiereEnum.PK}
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

export const queryCoursesGET = (
  // targetIdInTableForFKCourse: string,
  // targetTableName: string,
  // targetFKIdUser: string,
  // idUser: number,
  startDate: string,
  numberOfDays: number
): string => {
  const query = `
  DECLARE @StartDate DATE = '${startDate}';
  DECLARE @EndDate DATE = DATEADD(DAY, ${numberOfDays}, @StartDate);

  SELECT
  C.${CoursEnum.PK},
  C.${CoursEnum.LIBELLE},
  C.${CoursEnum.DATE},
  C.${CoursEnum.DEBUT},
  C.${CoursEnum.FIN},
  C.${CoursEnum.FK_INTERVENANT} AS id_intervenant,
  C.${CoursEnum.FK_ATTACH_PROMO} AS id_attache_de_promotion,
  C.${CoursEnum.FK_REPROGRAPHE} AS id_reprographe,
  C.${CoursEnum.FK_RESP_PEDAGO} AS id_responsable_pedagogique,
  U1.${UtilisateurEnum.PK} AS id_user_reprographe,
  U1.${UtilisateurEnum.NOM} AS nom_reprographe,
  U1.${UtilisateurEnum.PRENOM} AS prenom_reprographe,
  U2.${UtilisateurEnum.PK} AS id_user_intervenant,
  U2.${UtilisateurEnum.NOM} AS nom_intervenant,
  U2.${UtilisateurEnum.PRENOM} AS prenom_intervenant,
  U3.${UtilisateurEnum.PK} AS id_user_attache_de_promotion,
  U3.${UtilisateurEnum.NOM} AS nom_attache_de_promotion,
  U3.${UtilisateurEnum.PRENOM} AS prenom_attache_de_promotion,
  U4.${UtilisateurEnum.PK} AS id_user_responsable_pedagogique,
  U4.${UtilisateurEnum.NOM} AS nom_responsable_pedagogique,
  U4.${UtilisateurEnum.PRENOM} AS prenom_responsable_pedagogique,
  Cl.${StudClassEnum.LIBELLE},
  Cl.${StudClassEnum.PK},
  S.${RoomEnum.LIBELLE},
  S.${RoomEnum.PK},
  M.${MatiereEnum.LIBELLE},
  M.${MatiereEnum.PK}
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
  WHERE ${CoursEnum.DATE} BETWEEN @StartDate AND @EndDate;

  `;
  return query;
};

export const coursesPagesGETQuery = (
  startDate: string,
  numberOfDays: number
) => {
  const query = `
  DECLARE @StartDate DATE = '${startDate}';
  DECLARE @EndDate DATE = DATEADD(DAY, ${numberOfDays}, @StartDate);

  SELECT *
  FROM ${CoursEnum.NOM_TABLE}
  WHERE ${CoursEnum.DATE} BETWEEN @StartDate AND @EndDate;
  `;
  return query;
};

// Function that returns an SQL QUERY to get all students of a specific course
export const allStudentsOfACourseGETQuery = (idCourse: number): string => {
  const query = `
  SELECT
  ${EtudiantEnum.NOM_TABLE}.${EtudiantEnum.PK},
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.PK},
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.NOM},
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.PRENOM},
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.EMAIL}
  FROM ${CoursEnum.NOM_TABLE}
  LEFT JOIN ${EtudiantEnum.NOM_TABLE} ON ${CoursEnum.NOM_TABLE}.${CoursEnum.FK_CLASSE} = ${EtudiantEnum.NOM_TABLE}.${EtudiantEnum.FK_CLASSE}
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} ON ${EtudiantEnum.NOM_TABLE}.${EtudiantEnum.FK_UTILISATEUR} = ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.PK}
  WHERE ${CoursEnum.NOM_TABLE}.${CoursEnum.PK} = ${idCourse};
  `;
  return query;
};

export const queryNewCoursesPOST = (sqlQueryBodyData: CourseEnum): string => {
  const query = `
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
            ${CoursEnum.FK_CLASSE} )      
        OUTPUT inserted.${CoursEnum.PK}  
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
  return query;
};

export const queryGetCourseAndStudentsGET = (idCours: string): string => {
  const query = `
  SELECT
  ${CoursEnum.NOM_TABLE}.${CoursEnum.PK} AS idCours,
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.PK} AS idUtilisateur,
  ${EtudiantEnum.NOM_TABLE}.${EtudiantEnum.PK} AS idEtudiant,
  ${CoursEnum.NOM_TABLE}.${CoursEnum.LIBELLE} AS libelleCours,
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.NOM} AS nomUtilisateur,
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.PRENOM} AS prenomUtilisateur,
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.EMAIL} AS emailUtilisateur
  FROM ${CoursEnum.NOM_TABLE}
  LEFT JOIN ${EtudiantEnum.NOM_TABLE} ON ${EtudiantEnum.NOM_TABLE}.${EtudiantEnum.FK_CLASSE} = ${CoursEnum.NOM_TABLE}.${CoursEnum.FK_CLASSE}
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} ON ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.PK} = ${EtudiantEnum.NOM_TABLE}.${EtudiantEnum.FK_UTILISATEUR}
  WHERE ${CoursEnum.NOM_TABLE}.${CoursEnum.PK} = '${idCours}'
  `;
  return query;
};

export const queryCreateAStudentPresencePOST = (
  newStudentPresence: PresenceModel
): string => {
  const query = `
  INSERT INTO ${PresenceEnum.NOM_TABLE}
  (${PresenceEnum.FK_ETUDIANT}, ${PresenceEnum.FK_COURS})
  VALUES
  (${newStudentPresence.id_etudiant}, ${newStudentPresence.id_cours})
  `;
  return query;
};

export const queryDeleteCourseAndPresencesDELETE = (
  idCourse: number
): string => {
  const query = `
  DELETE FROM ${PresenceEnum.NOM_TABLE}
  WHERE ${PresenceEnum.FK_COURS} = ${idCourse};
  DELETE FROM ${CoursEnum.NOM_TABLE}
  WHERE ${CoursEnum.PK} = ${idCourse};
  `;
  return query;
};

export const queryPatchCoursePATCH = (
  idCourse: number,
  sqlQueryBodyData: CourseEnum
): string => {
  const query = `
  UPDATE ${CoursEnum.NOM_TABLE}
  SET ${CoursEnum.LIBELLE} = '${sqlQueryBodyData.courseLabel}',
  ${CoursEnum.DATE} = '${sqlQueryBodyData.courseDate}',
  ${CoursEnum.DEBUT} = '${sqlQueryBodyData.startCourse}',
  ${CoursEnum.FIN} = '${sqlQueryBodyData.endCourse}',
  ${CoursEnum.FK_INTERVENANT} = ${sqlQueryBodyData.idTeacher},
  ${CoursEnum.FK_RESP_PEDAGO} = ${sqlQueryBodyData.idRespPedago},
  ${CoursEnum.FK_ATTACH_PROMO} = ${sqlQueryBodyData.idAttachePromotion},
  ${CoursEnum.FK_REPROGRAPHE} = ${sqlQueryBodyData.idReprographe},
  ${CoursEnum.FK_SALLE} = ${sqlQueryBodyData.idClassRoom},
  ${CoursEnum.FK_MATIERE} = ${sqlQueryBodyData.idCourseSubject}
  WHERE ${CoursEnum.PK} = ${idCourse}
  `;

  //  ${CoursEnum.FK_CLASSE} = ${sqlQueryBodyData.idClass}
  return query;
};
