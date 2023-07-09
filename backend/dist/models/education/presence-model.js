"use strict";
/**
 * CREATE TABLE Role_utilisateur
(
  id_role_utilisateur INT IDENTITY(1,1) PRIMARY KEY,
  libelle_role VARCHAR(255),
  droits VARCHAR(255)
);


CREATE TABLE Utilisateur
(
  id_utilisateur INT IDENTITY(1,1) PRIMARY KEY,
  nom VARCHAR(255),
  prenom VARCHAR(255),
  adresse_email VARCHAR(255),
  motdepasse VARCHAR(255),
  id_role_utilisateur INT,
  FOREIGN KEY (id_role_utilisateur) REFERENCES Role_Utilisateur(id_role_utilisateur)
);



CREATE TABLE Campus
(
  id_campus INT IDENTITY(1,1) PRIMARY KEY,
  libelle_campus VARCHAR(255),
  adresse_campus VARCHAR(255),
  codepostal_campus VARCHAR(10)
);


CREATE TABLE Salle
(
  id_salle INT IDENTITY(1,1) PRIMARY KEY,
  etage INT,
  libelle_salle VARCHAR(255),
  capacite_salle INT,
  equipement_salle VARCHAR(255),
  id_campus INT,
  FOREIGN KEY (id_campus) REFERENCES Campus(id_campus)
);


CREATE TABLE Ecole
(
  id_ecole INT IDENTITY(1,1) PRIMARY KEY,
  libelle_ecole VARCHAR(255),
  domaine_ecole VARCHAR(255)
);


CREATE TABLE Promotion
(
  id_promotion INT IDENTITY(1,1) PRIMARY KEY,
  libelle_promotion VARCHAR(255),
  annee_promotion DATE,
  diplome_promotion VARCHAR(255),
  domaine_promotion VARCHAR(255),
  specialite_promotion VARCHAR(255),
  niveau_etude VARCHAR(255),
  id_ecole INT,
  id_campus INT,
  FOREIGN KEY (id_campus) REFERENCES Campus(id_campus),
  FOREIGN KEY (id_ecole) REFERENCES Ecole(id_ecole)
);


CREATE TABLE Classe
(
  id_classe INT IDENTITY(1,1) PRIMARY KEY,
  libelle_classe VARCHAR(255),
  id_promotion INT,
  FOREIGN KEY (id_promotion) REFERENCES Promotion(id_promotion)
);


CREATE TABLE Reprographe
(
  id_reprographe INT IDENTITY(1,1) PRIMARY KEY,
  id_utilisateur INT,
  id_salle INT,
  FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
  FOREIGN KEY (id_salle) REFERENCES Salle(id_salle)
);


CREATE TABLE Attache_de_promotion
(
  id_attache_de_promotion INT IDENTITY(1,1) PRIMARY KEY,
  id_utilisateur INT,
  id_salle INT,
  FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
  FOREIGN KEY (id_salle) REFERENCES Salle(id_salle)
);


CREATE TABLE Responsable_pedagogique
(
  id_responsable_pedagogique INT IDENTITY(1,1) PRIMARY KEY,
  id_utilisateur INT,
  id_salle INT,
  FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
  FOREIGN KEY (id_salle) REFERENCES Salle(id_salle)
);


CREATE TABLE Etudiant
(
  id_etudiant INT IDENTITY(1,1) PRIMARY KEY,
  id_utilisateur INT,
  id_classe INT,
  FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
  FOREIGN KEY (id_classe) REFERENCES Classe(id_classe)
);


CREATE TABLE Intervenant
(
  id_intervenant INT IDENTITY(1,1) PRIMARY KEY,
  id_utilisateur INT,
  libelle_specialite VARCHAR(255),
  FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur)
);


CREATE TABLE Matiere
(
  id_matiere INT IDENTITY(1,1) PRIMARY KEY,
  id_intervenant INT,
  libelle_matiere VARCHAR(255),
  id_ecole INT,
  FOREIGN KEY (id_intervenant) REFERENCES Intervenant(id_intervenant),
  FOREIGN KEY (id_ecole) REFERENCES Ecole(id_ecole)
);


CREATE TABLE Cours
(
  id_cours INT IDENTITY(1,1) PRIMARY KEY,
  libelle_cours VARCHAR(255),
  date_cours DATE,
  heure_debut_cours TIME,
  heure_fin_cours TIME,
  id_intervenant INT,
  id_responsable_pedagogique INT,
  id_attache_de_promotion INT,
  id_reprographe INT,
  id_salle INT,
  id_matiere INT,
  id_classe INT,
  FOREIGN KEY (id_intervenant) REFERENCES Intervenant(id_intervenant),
  FOREIGN KEY (id_responsable_pedagogique) REFERENCES Responsable_pedagogique(id_responsable_pedagogique),
  FOREIGN KEY (id_attache_de_promotion) REFERENCES Attache_de_promotion(id_attache_de_promotion),
  FOREIGN KEY (id_reprographe) REFERENCES Reprographe(id_reprographe),
  FOREIGN KEY (id_salle) REFERENCES Salle(id_salle),
  FOREIGN KEY (id_matiere) REFERENCES Matiere(id_matiere),
  FOREIGN KEY (id_classe) REFERENCES Classe(id_classe)
);


CREATE TABLE Presence
(
  id_presence INT IDENTITY(1,1) PRIMARY KEY,
  est_present BIT ,
  est_absent BIT ,
  id_cours INT,
  id_etudiant INT,
  FOREIGN KEY (id_cours) REFERENCES Cours(id_cours),
  FOREIGN KEY (id_etudiant) REFERENCES Etudiant(id_etudiant)
)


with this data :
I wnnt a model page that manage the presence of students in a course for sql database
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=presence-model.js.map