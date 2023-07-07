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
const secret_password_json_1 = __importDefault(require("../CONFIG-FILES/secret-password.json"));
const jwt = __importStar(require("jsonwebtoken"));
// TODO : create admin right check
const ADMIN_RIGHTS = 'admin';
// TODO : create hash
// Temporary
const etudiant = {
    id_etudiant: 1,
    email_etudiant: 'luigi@emargis.fr',
    mot_de_passe_etudiant: 'azerty',
};
const login = (request, response) => {
    const loginBody = request.body;
    const loginAlias = loginBody.login;
    const loginPassword = loginBody.password;
    const result = { recordset: [etudiant] };
    // CANNOT CONNECT TO SQL SERVER
    // sql
    //   .connect(config)
    //   .then((pool) => {
    //     //   return pool.request().query('SELECT FROM Etudiant WHERE email_etudiant = ${loginAlias}}');
    //     return { recordset: [etudiant] };
    //   })
    //   .then((result) => {
    //     if (result.recordset[0].mot_de_passe_etudiant === loginPassword) {
    //       const payload = {
    //         sub: loginAlias,
    //         id: result.recordset[0].id_etudiant,
    //         role: ADMIN_RIGHTS,
    //       };
    //       const claims = {
    //         expiresIn: '2h',
    //         audience: ADMIN_RIGHTS,
    //       };
    //       const token = jwt.sign(payload, secretPass.passwordToken, claims);
    //       response
    //         .status(200)
    //         .json({
    //           token: () => token,
    //           userId: result.recordset[0].id_etudiant.toString(),
    //         });
    //     } else {
    //       response.status(401).send("User doesn't exist.");
    //     }
    //   });
    if (result.recordset[0].mot_de_passe_etudiant === loginPassword) {
        const payload = {
            sub: loginAlias,
            id: result.recordset[0].id_etudiant,
            role: ADMIN_RIGHTS,
        };
        const options = {
            expiresIn: '1h',
            audience: ADMIN_RIGHTS,
        };
        const token = jwt.sign(payload, secret_password_json_1.default.passwordToken, options);
        response.status(200).json({
            token,
            userId: result.recordset[0].id_etudiant.toString(),
        });
    }
    else {
        response.status(401).send("User doesn't exist.");
    }
};
module.exports = login;
//# sourceMappingURL=authentication.js.map