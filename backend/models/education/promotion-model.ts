export enum PromotionEnum {
  NOM_TABLE = 'Promotion',
  PK = 'id_promotion',
  LIBELLE = 'libelle_promotion',
  ANNEE = 'annee_promotion',
  DOMAINE = 'domaine_promotion',
  SPECIALITE_PROMOTION = 'specialite_promotion',
  DIPLOME = 'diplome_promotion',
  NIVEAU_ETUDE = 'niveau_etude',
  FK_ECOLE = 'id_ecole',
}

export interface PromotionPOST {
  libellePromotion: string;
  anneePromotion: string;
  domainePromotion: string;
  specialitePromotion: string;
  diplomePromotion: string;
  niveauEtude: string;
  idEcole: number;
}
