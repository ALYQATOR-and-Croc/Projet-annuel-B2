import { EtudiantEnum } from '../users/etudiant-model';
import { UtilisateurPagination } from '../users/roles-model';
import { UtilisateurEnum } from '../users/user-model';

export enum StudClassEnum {
  NOM_TABLE = 'Classe',
  PK = 'id_classe',
  LIBELLE = 'libelle_classe',
  FK_PROMOTION = 'id_promotion',
  FK_CAMPUS = 'id_campus',
}

export interface StudClassPOST {
  libelleClasse: string;
  idPromotion: 'id_promotion';
  idCampus: 'id_campus';
}

export const courseColumns = {
  LIBELLE: 'libelle_cours',
  DATE: 'date_cours',
  HEURE_DEBUT: 'heure_debut',
  HEURE_FIN: 'heure_fin',
};

export type CourseColumns = 'LIBELLE' | 'DATE' | 'HEURE_DEBUT' | 'HEURE_FIN';

export const querygetAllClassGET = (
  page: number,
  rowsNumber: number,
  orderBy: CourseColumns
): string => {
  const query = `

  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  SELECT
  ${StudClassEnum.PK} AS idClass,
  ${UtilisateurEnum.PK} AS idUtilisateur,
  ${EtudiantEnum.PK} AS idEtudiant,
  ${StudClassEnum.LIBELLE} AS libelleClass,
  ${UtilisateurEnum.NOM} AS nomUtilisateur,
  ${UtilisateurEnum.PRENOM} AS prenomUtilisateur,
  ${UtilisateurEnum.EMAIL} AS emailUtilisateur,
  FROM ${StudClassEnum.NOM_TABLE}
  LEFT JOIN ${EtudiantEnum.NOM_TABLE} ON ${EtudiantEnum.FK_CLASSE} = ${StudClassEnum.PK}
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} ON ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.PK} = ${EtudiantEnum.NOM_TABLE}.${EtudiantEnum.FK_UTILISATEUR}
  ORDER BY U.${courseColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
  return query;
};

export const queryGetOneClassGET = (idClass: string): string => {
  const query = `
  SELECT
  ${StudClassEnum.NOM_TABLE}.${StudClassEnum.PK} AS idClass,
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.PK} AS idUtilisateur,
  ${EtudiantEnum.NOM_TABLE}.${EtudiantEnum.PK} AS idEtudiant,
  ${StudClassEnum.NOM_TABLE}.${StudClassEnum.LIBELLE} AS libelleClass,
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.NOM} AS nomUtilisateur,
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.PRENOM} AS prenomUtilisateur,
  ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.EMAIL} AS emailUtilisateur
  FROM ${StudClassEnum.NOM_TABLE}
  LEFT JOIN ${EtudiantEnum.NOM_TABLE} ON ${EtudiantEnum.NOM_TABLE}.${EtudiantEnum.FK_CLASSE} = ${StudClassEnum.NOM_TABLE}.${StudClassEnum.PK}
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} ON ${UtilisateurEnum.NOM_TABLE}.${UtilisateurEnum.PK} = ${EtudiantEnum.NOM_TABLE}.${EtudiantEnum.FK_UTILISATEUR}
  WHERE ${StudClassEnum.NOM_TABLE}.${StudClassEnum.PK} = '${idClass}'
  `;
  return query;
};

export const querySelectStudentsInClass = (idClass: string): string => {
  const query = `
  SELECT
  *
  FROM ${EtudiantEnum.NOM_TABLE}
  WHERE ${EtudiantEnum.FK_CLASSE} = '${idClass}'
  `;
  return query;
};
