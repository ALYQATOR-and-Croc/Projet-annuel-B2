import { UtilisateurEnum, utilisateurColumns } from './user-model';

export interface RolesTypePOST {
  libelleRole: string;
  droits: string;
}

export const rolesColumns = {
  LIBELLE: 'libelle_role',
  DROITS: 'droits',
  PK: 'id_role_utilisateur',
};

export enum RolesEnum {
  NOM_TABLE = 'Role_utilisateur',
  PK = 'id_role_utilisateur',
  LIBELLE = 'libelle_role',
  DROITS = 'droits',
}

export enum isRightRoleEnum {
  ETUDIANT = 'ETUDIANT',
  INTERVENANT = 'INTERVENANT',
  ATTACHE_PROMO = 'ATTACHE_PROMO',
  RESPONSABLE_PEDA = 'RESPONSABLE_PEDA',
  REPROGRAPHE = 'REPROGRAPHE',
  ADMINISTRATEUR = 'ADMINISTRATEUR',
}
export const queryRoleGET = () => {
  const queryGET = `
  SELECT
  *
  FROM ${RolesEnum.NOM_TABLE}
  `;
  return queryGET;
};

export type UtilisateurPagination = 'NOM' | 'PRENOM' | 'EMAIL' | 'PK';

export type RolePagination = 'LIBELLE' | 'DROITS' | 'PK';
