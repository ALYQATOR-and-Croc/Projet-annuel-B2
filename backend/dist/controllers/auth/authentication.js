"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const secret_password_json_1 = __importDefault(require("../../CONFIG-FILES/secret-password.json"));
const jwt = __importStar(require("jsonwebtoken"));
const user_model_1 = require("../../models/users/user-model");
const user_model_2 = require("../../models/users/user-model");
const etudiant_model_1 = require("../../models/users/etudiant-model");
const reprographe_model_1 = require("../../models/users/reprographe-model");
const intervenant_1 = require("../../models/users/intervenant");
const attache_promotion_model_1 = require("../../models/users/attache-promotion-model");
const resp_pedago_model_1 = require("../../models/users/resp-pedago-model");
const roles_model_1 = require("../../models/users/roles-model");
// TODO : create admin right check
const ADMIN_RIGHTS = "admin";
// TODO : create hash
// Temporary
// const etudiant = {
//   id_etudiant: 1,
//   email_etudiant: 'luigi@emargis.fr',
//   mot_de_passe_etudiant: 'azerty',
// };
/**
 * {
 *  idRole
 *  idClasse
 *
 * }
 * @param request
 * @param response
 */
const signup = (request, response) => {
    const body = request.body;
    const userSqlQuery = {
        nomUtilisateur: body.nom,
        prenomUtilisateur: body.prenom,
        emailUtilisateur: body.email,
        mdp: body.mdp,
        idRole: body.idRole,
        fonction: body.fonction,
    };
    bcryptjs_1.default.hash(userSqlQuery.mdp, secret_password_json_1.default.passwordHashSalt).then((hash) => {
        mssql_1.default.connect(config).then((pool) => {
            const queryNewUser = `
      DECLARE @InsertedIDs TABLE (${user_model_1.UtilisateurEnum.PK} INT PRIMARY KEY);
      INSERT INTO 
      ${user_model_1.UtilisateurEnum.NOM_TABLE} 
      (${user_model_1.UtilisateurEnum.PRENOM}, 
        ${user_model_1.UtilisateurEnum.NOM}, 
        ${user_model_1.UtilisateurEnum.EMAIL}, 
        ${user_model_1.UtilisateurEnum.MDP}, 
        ${user_model_1.UtilisateurEnum.FK_ROLE_UTILISATEUR})
      OUTPUT INSERTED.${user_model_1.UtilisateurEnum.PK} INTO @InsertedIDs
      VALUES
      ('${userSqlQuery.prenomUtilisateur}', 
        '${userSqlQuery.nomUtilisateur}', 
        '${userSqlQuery.emailUtilisateur}', 
        '${hash}', 
        ${userSqlQuery.idRole});
      SELECT id_utilisateur FROM @InsertedIDs;
      `;
            pool
                .request()
                .query(queryNewUser)
                .then((result) => {
                const queryFonction = newFunctionQuery(body.fonction, result.recordset[0][user_model_1.UtilisateurEnum.PK], body);
                if (queryFonction !== null) {
                    return pool
                        .request()
                        .query(queryFonction)
                        .then(() => {
                        response.status(201).send("User was successfully created.");
                    });
                }
                else {
                    response.status(201).send("User was successfully created.");
                }
            });
        });
    });
};
exports.signup = signup;
const newFunctionQuery = (fonctionType, fkUtilisateur, body) => {
    try {
        let queryNewFunction = null;
        switch (fonctionType) {
            case user_model_2.FonctionEnum.ETUDIANT:
                queryNewFunction = `
      INSERT INTO ${etudiant_model_1.EtudiantEnum.NOM_TABLE} (${etudiant_model_1.EtudiantEnum.FK_UTILISATEUR}, ${etudiant_model_1.EtudiantEnum.FK_CLASSE})
      VALUES
      (${fkUtilisateur}, ${body.idClasse})
      `;
                break;
            case user_model_2.FonctionEnum.INTERVENANT:
                queryNewFunction = `
      INSERT INTO ${intervenant_1.IntervenantEnum.NOM_TABLE} (${intervenant_1.IntervenantEnum.FK_UTILISATEUR}, ${intervenant_1.IntervenantEnum.LIBELLE})
      VALUES
      (${fkUtilisateur}, '${body.libelleSpecialite}')
      `;
                break;
            case user_model_2.FonctionEnum.RESPONSABLE_PEDA:
                queryNewFunction = `
      INSERT INTO ${resp_pedago_model_1.ResponsablePedagogiqueEnum.NOM_TABLE} (${resp_pedago_model_1.ResponsablePedagogiqueEnum.FK_UTILISATEUR}, ${resp_pedago_model_1.ResponsablePedagogiqueEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${body.idSalle})
      `;
                break;
            case user_model_2.FonctionEnum.REPROGRAPHE:
                queryNewFunction = `
      INSERT INTO ${reprographe_model_1.ReprographeEnum.NOM_TABLE} (${reprographe_model_1.ReprographeEnum.FK_UTILISATEUR}, ${reprographe_model_1.ReprographeEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${body.idSalle})
      `;
                break;
            case user_model_2.FonctionEnum.ATTACHE_PROMO:
                queryNewFunction = `
      INSERT INTO ${attache_promotion_model_1.AttachePromotionEnum.NOM_TABLE} (${attache_promotion_model_1.AttachePromotionEnum.FK_UTILISATEUR}, ${attache_promotion_model_1.AttachePromotionEnum.FK_SALLE})
      VALUES
      (${fkUtilisateur}, ${body.idSalle})
      `;
                break;
            case user_model_2.FonctionEnum.ADMIN:
                break;
            default:
                throw new Error("Function does not exists.");
        }
        return queryNewFunction;
    }
    catch (error) {
        throw new Error("Error");
    }
};
const login = (request, response) => {
    try {
        const loginBody = request.body;
        const loginAlias = loginBody.login;
        const loginPswd = loginBody.password;
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
    SELECT 
    ${user_model_1.UtilisateurEnum.PK},
    ${user_model_1.UtilisateurEnum.NOM}, 
    ${user_model_1.UtilisateurEnum.PRENOM}, 
    ${user_model_1.UtilisateurEnum.MDP}, 
    ${user_model_1.UtilisateurEnum.EMAIL}, 
    ${roles_model_1.RolesEnum.NOM_TABLE}.${roles_model_1.RolesEnum.DROITS}, 
    ${roles_model_1.RolesEnum.NOM_TABLE}.${roles_model_1.RolesEnum.LIBELLE} 
    FROM ${user_model_1.UtilisateurEnum.NOM_TABLE}
    RIGHT JOIN ${roles_model_1.RolesEnum.NOM_TABLE} 
    ON ${user_model_1.UtilisateurEnum.NOM_TABLE}.${user_model_1.UtilisateurEnum.FK_ROLE_UTILISATEUR} = ${roles_model_1.RolesEnum.NOM_TABLE}.${roles_model_1.RolesEnum.PK}
    WHERE ${user_model_1.UtilisateurEnum.EMAIL} = '${loginAlias}'
    `;
            return pool.request().query(query);
        })
            .then((result) => {
            bcryptjs_1.default
                .compare(loginPswd, result.recordset[0][user_model_1.UtilisateurEnum.MDP])
                .then((isPswdEqual) => {
                if (isPswdEqual) {
                    console.log("Password is correct");
                    return result;
                }
                else {
                    response.status(401).send("Password is incorrect");
                }
            })
                .then((result) => {
                var _a;
                try {
                    if (result === undefined) {
                        throw new Error("User does not exists");
                    }
                    const payload = {
                        sub: loginAlias,
                        id: result.recordset[0][user_model_1.UtilisateurEnum.PK],
                        role: result.recordset[0][roles_model_1.RolesEnum.LIBELLE],
                    };
                    const claims = {
                        expiresIn: "5h",
                        audience: result.recordset[0][roles_model_1.RolesEnum.DROITS],
                    };
                    response.status(200).json({
                        token: jwt.sign(payload, secret_password_json_1.default.passwordToken, claims),
                        userId: (_a = result.recordset[0][user_model_1.UtilisateurEnum.PK]) === null || _a === void 0 ? void 0 : _a.toString(),
                    });
                }
                catch (error) { }
            });
        });
    }
    catch (error) {
        response.status(401).send(error);
    }
};
exports.login = login;
//# sourceMappingURL=authentication.js.map