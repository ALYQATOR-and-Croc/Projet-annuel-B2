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
