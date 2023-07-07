import { RoomEnum } from '../infrastructure/room-model';
import { IntervenantEnum } from '../users/intervenant';
import { RolesEnum } from '../users/roles-model';
import { UtilisateurEnum } from '../users/user-model';
import { MatiereEnum } from './matiere-model';
import { StudClassEnum } from './student-class-model';

export interface CoursePOST {
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
  NOM_TABLE = 'Cours',
  PK = 'id_cours',
  LIBELLE = 'libelle_cours',
  DATE = 'date_cours',
  DEBUT = 'heure_debut_cours',
  FIN = 'heure_fin_cours',
  FK_INTERVENANT = 'id_intervenant',
  FK_RESP_PEDAGO = 'id_responsable_pedagogique',
  FK_ATTACH_PROMO = 'id_attache_de_promotion',
  FK_REPROGRAPHE = 'id_reprographe',
  FK_SALLE = 'id_salle',
  FK_MATIERE = 'id_matiere',
  FK_CLASSE = 'id_classe',
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
  U1.${UtilisateurEnum.PK} AS id_reprographe,
  U1.${UtilisateurEnum.NOM} AS nom_reprographe,
  U1.${UtilisateurEnum.PRENOM} AS prenom_reprographe,
  U2.${UtilisateurEnum.PK} AS id_intervenant,
  U2.${UtilisateurEnum.NOM} AS nom_intervenant,
  U2.${UtilisateurEnum.PRENOM} AS prenom_intervenant,
  U3.${UtilisateurEnum.PK} AS id_attache_de_promotion,
  U3.${UtilisateurEnum.NOM} AS nom_attache_de_promotion,
  U3.${UtilisateurEnum.PRENOM} AS prenom_attache_de_promotion,
  U4.${UtilisateurEnum.PK} AS id_responsable_pedagogique,
  U4.${UtilisateurEnum.NOM} AS nom_responsable_pedagogique,
  U4.${UtilisateurEnum.NOM} AS prenom_responsable_pedagogique,
  Cl.${StudClassEnum.LIBELLE},
  S.${RoomEnum.LIBELLE},
  M.${MatiereEnum.LIBELLE}
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
