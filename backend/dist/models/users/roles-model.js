"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRightRoleEnum = exports.RolesEnum = void 0;
var RolesEnum;
(function (RolesEnum) {
    RolesEnum["NOM_TABLE"] = "Role_utilisateur";
    RolesEnum["PK"] = "id_role_utilisateur";
    RolesEnum["LIBELLE"] = "libelle_role";
    RolesEnum["DROITS"] = "droits";
})(RolesEnum || (exports.RolesEnum = RolesEnum = {}));
var isRightRoleEnum;
(function (isRightRoleEnum) {
    isRightRoleEnum["ETUDIANT"] = "etudiant";
    isRightRoleEnum["INTERVENANT"] = "intervenant";
    isRightRoleEnum["ATTACHE_PROMO"] = "attache_promo";
    isRightRoleEnum["RESPONSABLE_PEDA"] = "responsable_peda";
    isRightRoleEnum["REPROGRAPHE"] = "reprographe";
    isRightRoleEnum["ADMIN"] = "admin";
})(isRightRoleEnum || (exports.isRightRoleEnum = isRightRoleEnum = {}));
//# sourceMappingURL=roles-model.js.map