"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FonctionEnum = exports.UtilisateurEnum = void 0;
var UtilisateurEnum;
(function (UtilisateurEnum) {
    UtilisateurEnum["NOM_TABLE"] = "Utilisateur";
    UtilisateurEnum["PK"] = "id_utilisateur";
    UtilisateurEnum["NOM"] = "nom";
    UtilisateurEnum["PRENOM"] = "prenom";
    UtilisateurEnum["EMAIL"] = "adresse_email";
    UtilisateurEnum["MDP"] = "motdepasse";
    UtilisateurEnum["FK_ROLE_UTILISATEUR"] = "id_role_utilisateur";
})(UtilisateurEnum || (exports.UtilisateurEnum = UtilisateurEnum = {}));
var FonctionEnum;
(function (FonctionEnum) {
    FonctionEnum["ETUDIANT"] = "ETUDIANT";
    FonctionEnum["INTERVENANT"] = "INTERVENANT";
    FonctionEnum["ATTACHE_PROMO"] = "ATTACHE_PROMO";
    FonctionEnum["RESPONSABLE_PEDA"] = "RESPONSABLE_PEDA";
    FonctionEnum["REPROGRAPHE"] = "REPROGRAPHE";
    FonctionEnum["ADMIN"] = "ADMIN";
})(FonctionEnum || (exports.FonctionEnum = FonctionEnum = {}));
//# sourceMappingURL=user-model.js.map