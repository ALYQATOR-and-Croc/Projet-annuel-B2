import { query } from "express";
import { AttachePromotionEnum } from "./attache-promotion-model";
import { EtudiantEnum } from "./etudiant-model";
import { IntervenantEnum } from "./intervenant";
import { ReprographeEnum } from "./reprographe-model";
import { ResponsablePedagogiqueEnum } from "./resp-pedago-model";
import { RolesEnum, UtilisateurPagination } from "./roles-model";
import { StudClassEnum } from "../education/student-class-model";

export enum UtilisateurEnum {
  NOM_TABLE = "Utilisateur",
  PK = "id_utilisateur",
  NOM = "nom",
  PRENOM = "prenom",
  EMAIL = "adresse_email",
  MDP = "motdepasse",
  FK_ROLE_UTILISATEUR = "id_role_utilisateur",
}

export const utilisateurColumns = {
  NOM: "nom",
  PRENOM: "prenom",
  EMAIL: "adresse_email",
  PK: "id_utilisateur",
};

export interface UtilisateurType {
  nomUtilisateur: string;
  prenomUtilisateur: string;
  emailUtilisateur: string;
  mdp: string;
  idRole: number;
  fonction: FonctionType;
}

export type FonctionType =
  | "ETUDIANT"
  | "INTERVENANT"
  | "ATTACHE_PROMO"
  | "RESPONSABLE_PEDA"
  | "REPROGRAPHE"
  | "ADMINISTRATEUR";

export enum FonctionEnum {
  ETUDIANT = "ETUDIANT",
  INTERVENANT = "INTERVENANT",
  ATTACHE_PROMO = "ATTACHE_PROMO",
  RESPONSABLE_PEDA = "RESPONSABLE_PEDA",
  REPROGRAPHE = "REPROGRAPHE",
  ADMIN = "ADMINISTRATEUR",
}

export const queryPaginatedEtudiantGET = (
  page: number,
  rowsNumber: number,
  orderBy: UtilisateurPagination
) => {
  const query = `
        DECLARE @PageNumber AS INT
        DECLARE @PageSize AS INT
        SET @PageNumber=${page}
        SET @PageSize=${rowsNumber}
        
        SELECT
        E.${EtudiantEnum.PK},
        CL.${StudClassEnum.PK},
        U.${UtilisateurEnum.PK},
        U.${UtilisateurEnum.PRENOM},
        U.${UtilisateurEnum.NOM},
        U.${UtilisateurEnum.EMAIL}
        FROM ${EtudiantEnum.NOM_TABLE} E
        LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON E.${EtudiantEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
        LEFT JOIN ${StudClassEnum.NOM_TABLE} AS CL ON E.${EtudiantEnum.FK_CLASSE} = CL.${StudClassEnum.PK}
        ORDER BY U.${utilisateurColumns[orderBy]} ASC
        OFFSET (@PageNumber - 1) * @PageSize ROWS
        FETCH NEXT @PageSize ROWS ONLY;
        ;`;
  return query;
};

export const queryPaginatedReprographeGET = (
  page: number,
  rowsNumber: number,
  orderBy: UtilisateurPagination
) => {
  const query = `

  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  R.${ReprographeEnum.PK},
  U.${UtilisateurEnum.PK},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL}
  FROM ${ReprographeEnum.NOM_TABLE} R
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON R.${ReprographeEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  ;`;
  return query;
};

export const queryPaginatedAttachePromoGET = (
  page: number,
  rowsNumber: number,
  orderBy: UtilisateurPagination
) => {
  const query = `

  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  AP.${AttachePromotionEnum.PK},
  U.${UtilisateurEnum.PK},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL}
  FROM ${AttachePromotionEnum.NOM_TABLE} AP
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON AP.${AttachePromotionEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  ;`;
  return query;
};

export const queryPaginatedIntervenantPromoGET = (
  page: number,
  rowsNumber: number,
  orderBy: UtilisateurPagination
) => {
  const query = `

  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  I.${IntervenantEnum.PK},
  U.${UtilisateurEnum.PK},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL}
  FROM ${IntervenantEnum.NOM_TABLE} I
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON I.${IntervenantEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
  return query;
};

export const queryPaginatedResponsablePedagogiqueGET = (
  page: number,
  rowsNumber: number,
  orderBy: UtilisateurPagination
) => {
  const query = `
  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  RP.${ResponsablePedagogiqueEnum.PK},
  U.${UtilisateurEnum.PK},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL}
  FROM ${ResponsablePedagogiqueEnum.NOM_TABLE} RP
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON RP.${ResponsablePedagogiqueEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
  return query;
};

export const queryPaginatedAdminGET = (
  page: number,
  rowsNumber: number,
  orderBy: UtilisateurPagination
) => {
  const query = `
  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  U.${UtilisateurEnum.PK},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL},
  R.${RolesEnum.LIBELLE},
  R.${RolesEnum.DROITS},
  R.${RolesEnum.PK}
  FROM ${UtilisateurEnum.NOM_TABLE} U
  LEFT JOIN ${RolesEnum.NOM_TABLE} R ON U.${UtilisateurEnum.FK_ROLE_UTILISATEUR} = R.${RolesEnum.PK}
  WHERE U.${UtilisateurEnum.FK_ROLE_UTILISATEUR} = 1
  ORDER BY U.${utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY
;
  `;
  return query;
};

export const queryDeleteUserDELETE = (
  idUser: number,
  fonction: FonctionType
) => {
  const query = `
  DELETE FROM ${UtilisateurEnum.NOM_TABLE}
  WHERE ${UtilisateurEnum.PK} = ${idUser};
  `;
  return query;
};

export const queryDeleteFonctionUserDELETE = (idUser: number) => {
  const query = `
      DELETE FROM ${EtudiantEnum.NOM_TABLE}
      WHERE ${EtudiantEnum.FK_UTILISATEUR} = ${idUser};

      DELETE FROM ${IntervenantEnum.NOM_TABLE}
      WHERE ${IntervenantEnum.FK_UTILISATEUR} = ${idUser};

      DELETE FROM ${AttachePromotionEnum.NOM_TABLE}
      WHERE ${AttachePromotionEnum.FK_UTILISATEUR} = ${idUser};

      DELETE FROM ${ResponsablePedagogiqueEnum.NOM_TABLE}
      WHERE ${ResponsablePedagogiqueEnum.FK_UTILISATEUR} = ${idUser};

      DELETE FROM ${ReprographeEnum.NOM_TABLE}
      WHERE ${ReprographeEnum.FK_UTILISATEUR} = ${idUser};
      `;
  return query;
};

export const queryPatchUserPATCH = (
  idUser: number,
  bodyQuery: UtilisateurType
) => {
  const query = `
  UPDATE ${UtilisateurEnum.NOM_TABLE}
  SET ${UtilisateurEnum.NOM} = '${bodyQuery.nomUtilisateur}',
  ${UtilisateurEnum.PRENOM} = '${bodyQuery.prenomUtilisateur}',
  ${UtilisateurEnum.EMAIL} = '${bodyQuery.emailUtilisateur}',
  ${UtilisateurEnum.FK_ROLE_UTILISATEUR} = ${bodyQuery.idRole}
  WHERE ${UtilisateurEnum.PK} = ${idUser};
  `;
  return query;
};

// export const queryPatchFonctionUserCREATE = (
//   idUser: number,
//   fonction: FonctionType
// ) => {
//   switch (fonction) {
//     case FonctionEnum.ETUDIANT:
//       return `
//       INSERT INTO ${EtudiantEnum.NOM_TABLE} (${EtudiantEnum.FK_UTILISATEUR})
//       VALUES (${idUser})
//       `;
//     case FonctionEnum.INTERVENANT:
//       return `
//       INSERT INTO ${IntervenantEnum.NOM_TABLE} (${IntervenantEnum.FK_UTILISATEUR})
//       VALUES (${idUser})
//       `;
//     case FonctionEnum.ATTACHE_PROMO:
//       return `
//       INSERT INTO ${AttachePromotionEnum.NOM_TABLE} (${AttachePromotionEnum.FK_UTILISATEUR})
//       VALUES (${idUser})
//       `;
//     case FonctionEnum.RESPONSABLE_PEDA:
//       return `
//       INSERT INTO ${ResponsablePedagogiqueEnum.NOM_TABLE} (${ResponsablePedagogiqueEnum.FK_UTILISATEUR})
//       VALUES (${idUser})
//       `;
//     case FonctionEnum.REPROGRAPHE:
//       return `
//       INSERT INTO ${ReprographeEnum.NOM_TABLE} (${ReprographeEnum.FK_UTILISATEUR})
//       VALUES (${idUser})
//       `;
//     default:
//       return "";
//   }
// };

export const newFunctionQuery = (
  fonctionType: FonctionType,
  fkUtilisateur: number,
  body: any
): string | null => {
  try {
    let queryNewFunction: string | null = null;
    let idSalle: number | null = null;
    switch (fonctionType) {
      case FonctionEnum.ETUDIANT:
        queryNewFunction = `
      INSERT INTO ${EtudiantEnum.NOM_TABLE} (${EtudiantEnum.FK_UTILISATEUR}, ${EtudiantEnum.FK_CLASSE})
      VALUES
      (${fkUtilisateur}, ${body.idClasse})
      `;
        break;
      case FonctionEnum.INTERVENANT:
        queryNewFunction = `
      INSERT INTO ${IntervenantEnum.NOM_TABLE} (${IntervenantEnum.FK_UTILISATEUR}, ${IntervenantEnum.LIBELLE})
      VALUES
      (${fkUtilisateur}, '${body.libelleSpecialite}')
      `;
        break;
      case FonctionEnum.RESPONSABLE_PEDA:
        "idSalle" in body ? (idSalle = body.idSalle) : (idSalle = 10);
        queryNewFunction = `
      INSERT INTO ${ResponsablePedagogiqueEnum.NOM_TABLE} (${ResponsablePedagogiqueEnum.FK_UTILISATEUR}, ${ResponsablePedagogiqueEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${idSalle})
      `;
        break;
      case FonctionEnum.REPROGRAPHE:
        "idSalle" in body ? (idSalle = body.idSalle) : (idSalle = 10);
        queryNewFunction = `
      INSERT INTO ${ReprographeEnum.NOM_TABLE} (${ReprographeEnum.FK_UTILISATEUR}, ${ReprographeEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${idSalle})
      `;
        break;
      case FonctionEnum.ATTACHE_PROMO:
        "idSalle" in body ? (idSalle = body.idSalle) : (idSalle = 10);
        queryNewFunction = `
      INSERT INTO ${AttachePromotionEnum.NOM_TABLE} (${AttachePromotionEnum.FK_UTILISATEUR}, ${AttachePromotionEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${idSalle})
      `;
        break;
      case FonctionEnum.ADMIN:
        break;

      default:
        throw new Error("");
    }
    return queryNewFunction;
  } catch (error) {
    throw new Error("Error");
  }
};
