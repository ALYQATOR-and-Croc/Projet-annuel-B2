export enum MatiereEnum {
  NOM_TABLE = 'Matiere',
  PK = 'id_matiere',
  FK_INTERVENANT = 'id_intervenant',
  LIBELLE = 'libelle_matiere',
  FK_ECOLE = 'id_ecole',
}

export interface MatiereType {
  libelleMatiere: string;
  idEcole: number;
  idIntervenant: number;
}

export type MatiereColumns = 'LIBELLE' | 'PK';

export const matiereColumns = {
  LIBELLE: 'libelle_matiere',
  PK: 'id_matiere',
};
