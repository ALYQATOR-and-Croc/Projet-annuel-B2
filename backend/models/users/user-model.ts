import { AttachePromotionEnum } from './attache-promotion-model';
import { EtudiantEnum } from './etudiant-model';
import { IntervenantEnum } from './intervenant';
import { ReprographeEnum } from './reprographe-model';
import { ResponsablePedagogiqueEnum } from './resp-pedago-model';
import { UtilisateurPagination } from './roles-model';

export enum UtilisateurEnum {
  NOM_TABLE = 'Utilisateur',
  PK = 'id_utilisateur',
  NOM = 'nom',
  PRENOM = 'prenom',
  EMAIL = 'adresse_email',
  MDP = 'motdepasse',
  FK_ROLE_UTILISATEUR = 'id_role_utilisateur',
}

export const utilisateurColumns = {
  NOM: 'nom',
  PRENOM: 'prenom',
  EMAIL: 'adresse_email',
  PK: 'id_utilisateur',
};

export interface UtilisateurPOST {
  nomUtilisateur: string;
  prenomUtilisateur: string;
  emailUtilisateur: string;
  mdp: string;
  idRole: string;
  fonction: FonctionType;
}

export type FonctionType =
  | 'ETUDIANT'
  | 'INTERVENANT'
  | 'ATTACHE_PROMO'
  | 'RESPONSABLE_PEDA'
  | 'REPROGRAPHE'
  | 'ADMIN';

export enum FonctionEnum {
  ETUDIANT = 'ETUDIANT',
  INTERVENANT = 'INTERVENANT',
  ATTACHE_PROMO = 'ATTACHE_PROMO',
  RESPONSABLE_PEDA = 'RESPONSABLE_PEDA',
  REPROGRAPHE = 'REPROGRAPHE',
  ADMIN = 'ADMIN',
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
        U.${UtilisateurEnum.PK},
        U.${UtilisateurEnum.PRENOM},
        U.${UtilisateurEnum.NOM},
        U.${UtilisateurEnum.EMAIL}
        FROM ${EtudiantEnum.NOM_TABLE} E
        LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON E.${EtudiantEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
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
