"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursEnum = void 0;
var CoursEnum;
(function (CoursEnum) {
    CoursEnum["NOM_TABLE"] = "Cours";
    CoursEnum["PK"] = "id_cours";
    CoursEnum["LIBELLE"] = "libelle_cours";
    CoursEnum["DATE"] = "date_cours";
    CoursEnum["DEBUT"] = "heure_debut_cours";
    CoursEnum["FIN"] = "heure_fin_cours";
    CoursEnum["FK_INTERVENANT"] = "id_intervenant";
    CoursEnum["FK_RESP_PEDAGO"] = "id_responsable_pedagogique";
    CoursEnum["FK_ATTACH_PROMO"] = "id_attache_de_promotion";
    CoursEnum["FK_REPROGRAPHE"] = "id_reprographe";
    CoursEnum["FK_SALLE"] = "id_salle";
    CoursEnum["FK_MATIERE"] = "id_matiere";
    CoursEnum["FK_CLASSE"] = "id_classe";
})(CoursEnum || (exports.CoursEnum = CoursEnum = {}));
//# sourceMappingURL=cours-model.js.map