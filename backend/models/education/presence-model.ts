import { booleanToSqlBit } from "../../utils/conversion-utils";
import { EtudiantEnum } from "../users/etudiant-model";
import { UtilisateurEnum } from "../users/user-model";
import { CoursEnum } from "./course-model";
import { StudClassEnum } from "./student-class-model";

export interface PresenceModel {
  id_presence: number;
  est_present: boolean;
  est_absent: boolean;
  id_cours: number;
  id_etudiant: number;
}

export enum PresenceEnum {
  NOM_TABLE = "Presence",
  PK = "id_presence",
  RETARD = "en_retard",
  ABSENT = "est_absent",
  FK_COURS = "id_cours",
  FK_ETUDIANT = "id_etudiant",
  SIGNE = "a_signe",
}

export interface PresencesBodyRequest {
  idCourse: number;
  listStudents: StudentPresence[];
}

export interface StudentPresence {
  idStudent: number;
  isAbsent: boolean;
  isLate: boolean;
  hasSigned: boolean;
}

export const queryNewPresencePOST = (idCourse: number, idStudent: number) => {
  const isLate = null;
  const isAbsent = null;
  const hasSigned = null;
  const query = `
  INSERT INTO 
  Presence 
  ( ${PresenceEnum.ABSENT}, ${PresenceEnum.RETARD}, ${PresenceEnum.FK_COURS}, ${PresenceEnum.FK_ETUDIANT} , ${PresenceEnum.SIGNE}) 
  VALUES (${isAbsent}, ${isLate}, ${idCourse}, ${idStudent}, ${hasSigned})`;
  return query;
};

export const queryUpdatePresencePUT = (
  idCourse: number,
  studentPresence: StudentPresence
) => {
  const isLate = booleanToSqlBit(studentPresence.isLate);
  const isAbsent = booleanToSqlBit(studentPresence.isAbsent);
  const hasSigned = booleanToSqlBit(studentPresence.hasSigned);
  const query = `
  UPDATE Presence 
  SET
  ${PresenceEnum.ABSENT} = ${isAbsent}, 
  ${PresenceEnum.RETARD} = ${isLate}, 
  ${PresenceEnum.SIGNE} = ${hasSigned}
  WHERE ${PresenceEnum.NOM_TABLE}.${PresenceEnum.FK_COURS} = ${idCourse} AND ${PresenceEnum.NOM_TABLE}.${PresenceEnum.FK_ETUDIANT} = ${studentPresence.idStudent}`;
  return query;
};

export const queryUpdatePresencePATCH = (
  idPresence: number,
  studentPresence: StudentPresence
) => {
  const isLate = booleanToSqlBit(studentPresence.isLate);
  const isAbsent = booleanToSqlBit(studentPresence.isAbsent);
  const hasSigned = booleanToSqlBit(studentPresence.hasSigned);
  const query = `
  UPDATE Presence 
  SET
  ${PresenceEnum.ABSENT} = ${isAbsent}, 
  ${PresenceEnum.RETARD} = ${isLate}, 
  ${PresenceEnum.SIGNE} = ${hasSigned}
  WHERE ${PresenceEnum.NOM_TABLE}.${PresenceEnum.PK} = ${idPresence}`;
  return query;
};

export const queryPresenceOfACourseGET = (idCourse: number) => {
  const query = `
  SELECT 
  C.${CoursEnum.PK},
  C.${CoursEnum.DATE},
  C.${CoursEnum.DEBUT},
  C.${CoursEnum.FIN},
  C.${CoursEnum.LIBELLE},
  CL.${StudClassEnum.PK},
  CL.${StudClassEnum.LIBELLE},
  P.${PresenceEnum.PK},
  P.${PresenceEnum.RETARD},
  P.${PresenceEnum.ABSENT},
  P.${PresenceEnum.SIGNE},
  E.${EtudiantEnum.PK},
  U.${UtilisateurEnum.PK},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL}
  FROM ${PresenceEnum.NOM_TABLE} AS P
  `;
  return query;
};
