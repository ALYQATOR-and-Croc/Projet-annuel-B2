export enum MatiereEnum {
  NOM_TABLE = 'Matiere',
  PK = 'id_matiere',
  FK_INTERVENANT = 'id_intervenant',
  LIBELLE = 'libelle_matiere',
  FK_ECOLE = 'id_ecole',
}

export interface MatierePOST {
  libelleMatiere: string;
  idEcole: number;
  idIntervenant: number;
}
