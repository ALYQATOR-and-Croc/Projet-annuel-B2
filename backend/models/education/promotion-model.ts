import { query } from "express";
import { SchoolEnum } from "../infrastructure/school-model";

export enum PromotionEnum {
  NOM_TABLE = "Promotion",
  PK = "id_promotion",
  LIBELLE = "libelle_promotion",
  ANNEE = "annee_promotion",
  DOMAINE = "domaine_promotion",
  SPECIALITE_PROMOTION = "specialite_promotion",
  DIPLOME = "diplome_promotion",
  NIVEAU_ETUDE = "niveau_etude",
  FK_ECOLE = "id_ecole",
}

export interface PromotionType {
  libellePromotion: string;
  anneePromotion: string;
  domainePromotion: string;
  specialitePromotion: string;
  diplomePromotion: string;
  niveauEtude: string;
  idEcole: number;
}

export interface PromotionTypePatch {
  libellePromotion: string;
  anneePromotion: string;
  domainePromotion: string;
  specialitePromotion: string;
  diplomePromotion: string;
  niveauEtude: string;
}

export const promotionColumns = {
  LIBELLE: "libelle_promotion",
  ANNEE: "annee_promotion",
  DOMAINE: "domaine_promotion",
  SPECIALITE_PROMOTION: "specialite_promotion",
  DIPLOME: "diplome_promotion",
  NIVEAU_ETUDE: "niveau_etude",
};

export type PromotionColumns =
  | 'LIBELLE'
  | 'ANNEE'
  | 'DOMAINE'
  | 'SPECIALITE_PROMOTION'
  | 'DIPLOME'
  | 'NIVEAU_ETUDE';

export const queryPromotionByIdGET = (idPromotion: number) => {
  const query = `
  SELECT
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.PK} AS id_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.LIBELLE} AS libelle_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.ANNEE} AS annee_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DOMAINE} AS domaine_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.SPECIALITE_PROMOTION} AS specialite_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DIPLOME} AS diplome_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.NIVEAU_ETUDE} AS niveau_etude,
  ${SchoolEnum.NOM_TABLE}.${SchoolEnum.PK} AS id_ecole,
  ${SchoolEnum.NOM_TABLE}.${SchoolEnum.LIBELLE} AS libelle_ecole,
  ${SchoolEnum.NOM_TABLE}.${SchoolEnum.DOMAINE} AS domaine_ecole
  FROM ${PromotionEnum.NOM_TABLE}

  LEFT JOIN ${SchoolEnum.NOM_TABLE} ON ${SchoolEnum.NOM_TABLE}.${SchoolEnum.PK} = ${PromotionEnum.NOM_TABLE}.${PromotionEnum.FK_ECOLE}
  WHERE ${PromotionEnum.NOM_TABLE}.${PromotionEnum.PK} = ${idPromotion}
  `;
  return query;
};

export const queryGetPaginatedPromotionGET = (
  page: number,
  rowsNumber: number,
  orderBy: PromotionColumns
): string => {
  const query = `
  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  SELECT
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.PK} AS id_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.LIBELLE} AS libelle_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.ANNEE} AS annee_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DOMAINE} AS domaine_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.SPECIALITE_PROMOTION} AS specialite_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DIPLOME} AS diplome_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.NIVEAU_ETUDE} AS niveau_etude,
  ${SchoolEnum.NOM_TABLE}.${SchoolEnum.PK} AS id_ecole,
  ${SchoolEnum.NOM_TABLE}.${SchoolEnum.LIBELLE} AS libelle_ecole,
  ${SchoolEnum.NOM_TABLE}.${SchoolEnum.DOMAINE} AS domaine_ecole
  FROM ${PromotionEnum.NOM_TABLE}
  LEFT JOIN ${SchoolEnum.NOM_TABLE} ON ${SchoolEnum.NOM_TABLE}.${SchoolEnum.PK} = ${PromotionEnum.NOM_TABLE}.${PromotionEnum.FK_ECOLE}
  ORDER BY ${PromotionEnum.NOM_TABLE}.${promotionColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
  return query;
};

export const queryGetPaginatedPromotionsBySchoolGET = (
  page: number,
  rowsNumber: number,
  orderBy: PromotionColumns,
  idSchool: number
): string => {
  const query = `
  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  SELECT
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.PK} AS id_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.LIBELLE} AS libelle_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.ANNEE} AS annee_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DOMAINE} AS domaine_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.SPECIALITE_PROMOTION} AS specialite_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.DIPLOME} AS diplome_promotion,
  ${PromotionEnum.NOM_TABLE}.${PromotionEnum.NIVEAU_ETUDE} AS niveau_etude,
  ${SchoolEnum.NOM_TABLE}.${SchoolEnum.PK} AS id_ecole,
  ${SchoolEnum.NOM_TABLE}.${SchoolEnum.LIBELLE} AS libelle_ecole,
  ${SchoolEnum.NOM_TABLE}.${SchoolEnum.DOMAINE} AS domaine_ecole
  FROM ${PromotionEnum.NOM_TABLE}
  LEFT JOIN ${SchoolEnum.NOM_TABLE} ON ${SchoolEnum.NOM_TABLE}.${SchoolEnum.PK} = ${PromotionEnum.NOM_TABLE}.${PromotionEnum.FK_ECOLE}
  WHERE ${PromotionEnum.NOM_TABLE}.${PromotionEnum.FK_ECOLE} = ${idSchool}
  ORDER BY ${PromotionEnum.NOM_TABLE}.${promotionColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
  return query;
};

export const queryDeletePromotionDELETE = (idPromotion: number): string => {
  const query = `
  DELETE FROM ${PromotionEnum.NOM_TABLE}
  WHERE ${PromotionEnum.PK} = ${idPromotion}
  `;
  return query;
};

export const queryPatchPromotionPATCH = (
  idPromotion: number,
  sqlQueryBodyData: PromotionTypePatch
): string => {
  const query = `
  UPDATE ${PromotionEnum.NOM_TABLE}
  SET ${PromotionEnum.LIBELLE} = '${sqlQueryBodyData.libellePromotion}',
  ${PromotionEnum.ANNEE} = '${sqlQueryBodyData.anneePromotion}',
  ${PromotionEnum.DOMAINE} = '${sqlQueryBodyData.domainePromotion}',
  ${PromotionEnum.SPECIALITE_PROMOTION} = '${sqlQueryBodyData.specialitePromotion}',
  ${PromotionEnum.DIPLOME} = '${sqlQueryBodyData.diplomePromotion}',
  ${PromotionEnum.NIVEAU_ETUDE} = '${sqlQueryBodyData.niveauEtude}'
  WHERE ${PromotionEnum.PK} = ${idPromotion}
  `;
  return query;
};
