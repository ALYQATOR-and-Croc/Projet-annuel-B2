"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPaginatedResponsablePedagogiqueGET = exports.queryPaginatedIntervenantPromoGET = exports.queryPaginatedAttachePromoGET = exports.queryPaginatedReprographeGET = exports.queryPaginatedEtudiantGET = exports.FonctionEnum = exports.utilisateurColumns = exports.UtilisateurEnum = void 0;
const attache_promotion_model_1 = require("./attache-promotion-model");
const etudiant_model_1 = require("./etudiant-model");
const intervenant_1 = require("./intervenant");
const reprographe_model_1 = require("./reprographe-model");
const resp_pedago_model_1 = require("./resp-pedago-model");
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
exports.utilisateurColumns = {
    NOM: 'nom',
    PRENOM: 'prenom',
    EMAIL: 'adresse_email',
    PK: 'id_utilisateur',
};
var FonctionEnum;
(function (FonctionEnum) {
    FonctionEnum["ETUDIANT"] = "ETUDIANT";
    FonctionEnum["INTERVENANT"] = "INTERVENANT";
    FonctionEnum["ATTACHE_PROMO"] = "ATTACHE_PROMO";
    FonctionEnum["RESPONSABLE_PEDA"] = "RESPONSABLE_PEDA";
    FonctionEnum["REPROGRAPHE"] = "REPROGRAPHE";
    FonctionEnum["ADMIN"] = "ADMIN";
})(FonctionEnum || (exports.FonctionEnum = FonctionEnum = {}));
const queryPaginatedEtudiantGET = (page, rowsNumber, orderBy) => {
    const query = `

        DECLARE @PageNumber AS INT
        DECLARE @PageSize AS INT
        SET @PageNumber=${page}
        SET @PageSize=${rowsNumber}
        
        SELECT 
        E.${etudiant_model_1.EtudiantEnum.PK},
        E.${etudiant_model_1.EtudiantEnum.FK_UTILISATEUR},
        U.${UtilisateurEnum.PRENOM},
        U.${UtilisateurEnum.NOM},
        U.${UtilisateurEnum.EMAIL},
        U.${UtilisateurEnum.PK}
        FROM ${etudiant_model_1.EtudiantEnum.NOM_TABLE} E
        LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON E.${etudiant_model_1.EtudiantEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
        ORDER BY U.${exports.utilisateurColumns[orderBy]} ASC
        OFFSET (@PageNumber - 1) * @PageSize ROWS
        FETCH NEXT @PageSize ROWS ONLY;
        ;`;
    return query;
};
exports.queryPaginatedEtudiantGET = queryPaginatedEtudiantGET;
const queryPaginatedReprographeGET = (page, rowsNumber, orderBy) => {
    const query = `

  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  R.${reprographe_model_1.ReprographeEnum.PK},
  R.${reprographe_model_1.ReprographeEnum.FK_UTILISATEUR},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL},
  U.${UtilisateurEnum.PK}
  FROM ${reprographe_model_1.ReprographeEnum.NOM_TABLE} R
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON R.${reprographe_model_1.ReprographeEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${exports.utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  ;`;
    return query;
};
exports.queryPaginatedReprographeGET = queryPaginatedReprographeGET;
const queryPaginatedAttachePromoGET = (page, rowsNumber, orderBy) => {
    const query = `

  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  AP.${attache_promotion_model_1.AttachePromotionEnum.PK},
  AP.${attache_promotion_model_1.AttachePromotionEnum.FK_UTILISATEUR},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL},
  U.${UtilisateurEnum.PK}
  FROM ${attache_promotion_model_1.AttachePromotionEnum.NOM_TABLE} AP
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON AP.${attache_promotion_model_1.AttachePromotionEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${exports.utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  ;`;
    return query;
};
exports.queryPaginatedAttachePromoGET = queryPaginatedAttachePromoGET;
const queryPaginatedIntervenantPromoGET = (page, rowsNumber, orderBy) => {
    const query = `

  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  I.${intervenant_1.IntervenantEnum.PK},
  I.${intervenant_1.IntervenantEnum.FK_UTILISATEUR},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL},
  U.${UtilisateurEnum.PK}
  FROM ${intervenant_1.IntervenantEnum.NOM_TABLE} I
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON I.${intervenant_1.IntervenantEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${exports.utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
    return query;
};
exports.queryPaginatedIntervenantPromoGET = queryPaginatedIntervenantPromoGET;
const queryPaginatedResponsablePedagogiqueGET = (page, rowsNumber, orderBy) => {
    const query = `
  DECLARE @PageNumber AS INT
  DECLARE @PageSize AS INT
  SET @PageNumber=${page}
  SET @PageSize=${rowsNumber}
  
  SELECT 
  RP.${resp_pedago_model_1.ResponsablePedagogiqueEnum.PK},
  RP.${resp_pedago_model_1.ResponsablePedagogiqueEnum.FK_UTILISATEUR},
  U.${UtilisateurEnum.PRENOM},
  U.${UtilisateurEnum.NOM},
  U.${UtilisateurEnum.EMAIL},
  U.${UtilisateurEnum.PK}
  FROM ${resp_pedago_model_1.ResponsablePedagogiqueEnum.NOM_TABLE} RP
  LEFT JOIN ${UtilisateurEnum.NOM_TABLE} AS U ON RP.${resp_pedago_model_1.ResponsablePedagogiqueEnum.FK_UTILISATEUR} = U.${UtilisateurEnum.PK}
  ORDER BY U.${exports.utilisateurColumns[orderBy]} ASC
  OFFSET (@PageNumber - 1) * @PageSize ROWS
  FETCH NEXT @PageSize ROWS ONLY;
  `;
    return query;
};
exports.queryPaginatedResponsablePedagogiqueGET = queryPaginatedResponsablePedagogiqueGET;
//# sourceMappingURL=user-model.js.map