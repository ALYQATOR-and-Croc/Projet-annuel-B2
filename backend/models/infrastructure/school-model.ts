export enum SchoolEnum {
  NOM_TABLE = 'Ecole',
  PK = 'id_ecole',
  LIBELLE = 'libelle_ecole',
  DOMAINE = 'domaine_ecole',
}

export interface SchoolPOST {
  libelleEcole: string;
  domaineEcole: string;
}
