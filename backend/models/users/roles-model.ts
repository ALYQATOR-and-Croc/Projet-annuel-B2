export interface RolesTypePOST {
  libelleRole: string;
  droits: string;
}

export enum RolesEnum {
  NOM_TABLE = 'Role_utilisateur',
  PK = 'id_role_utilisateur',
  LIBELLE = 'libelle_role',
  DROITS = 'droits',
}

export enum isRightRoleEnum {
  ETUDIANT = 'etudiant',
  INTERVENANT = 'intervenant',
  ATTACHE_PROMO = 'attache_promo',
  RESPONSABLE_PEDA = 'responsable_peda',
  REPROGRAPHE = 'reprographe',
  ADMIN = 'admin',
}

export type UtilisateurPagination = 'NOM' | 'PRENOM' | 'EMAIL' | 'PK';
