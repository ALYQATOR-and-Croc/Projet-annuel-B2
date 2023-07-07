export enum CampusEnum {
  NOM_TABLE = 'Campus',
  LIBELLE = 'libelle_campus',
  ADRESSE = 'adresse_campus',
  CODEPOSTAL = 'codepostal_campus',
}

export interface CampusPOST {
  libelleCampus: string;
  adresseCampus: string;
  codePostalCampus: number;
}
