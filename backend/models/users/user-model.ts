export enum UtilisateurEnum {
  NOM_TABLE = 'Utilisateur',
  PK = 'id_utilisateur',
  NOM = 'nom',
  PRENOM = 'prenom',
  EMAIL = 'adresse_email',
  MDP = 'motdepasse',
  FK_ROLE_UTILISATEUR = 'id_role_utilisateur',
}

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
