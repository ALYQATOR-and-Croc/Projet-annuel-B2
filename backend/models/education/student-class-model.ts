export enum StudClassEnum {
  NOM_TABLE = 'Classe',
  PK = 'id_classe',
  LIBELLE = 'libelle_classe',
  FK_PROMOTION = 'id_promotion',
  FK_CAMPUS = 'id_campus',
}

export interface StudClassPOST {
  libelleClasse: string;
  idPromotion: 'id_promotion';
  idCampus: 'id_campus';
}
