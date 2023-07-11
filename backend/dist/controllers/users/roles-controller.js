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
exports.responsablePedagogiqueGETList = exports.intervenantGETList = exports.attache_promoGETList = exports.etudiantGETList = exports.reprographeGETList = exports.newRolePOST = void 0;
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const roles_model_1 = require("../../models/users/roles-model");
const user_model_1 = require("../../models/users/user-model");
const newRolePOST = (request, response) => {
    const body = request.body;
    const sqlBody = {
        libelleRole: body.libelleRole,
        droits: body.droits,
    };
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const queryGET = `INSERT INTO ${roles_model_1.RolesEnum.NOM_TABLE} (${roles_model_1.RolesEnum.LIBELLE}, ${roles_model_1.RolesEnum.DROITS}) VALUES ('${sqlBody.libelleRole}', '${sqlBody.droits}')`;
            return pool.request().query(queryGET);
        })
            .then((result) => {
            if (result) {
                response.status(201).send('New role was successfully created !');
            }
            else {
                throw new Error('Unacceptable operation.');
            }
        });
    }
    catch (error) {
        response.status(405).send(error);
    }
};
exports.newRolePOST = newRolePOST;
const reprographeGETList = (request, response) => {
    try {
        const params = request.params;
        const page = params.pageNumber;
        const rowsNumber = params.rowsNumber;
        const orderBy = params.orderBy;
        mssql_1.default.connect(config).then((pool) => {
            console.log(user_model_1.utilisateurColumns[orderBy]);
            const queryGET = (0, user_model_1.queryPaginatedReprographeGET)(page, rowsNumber, orderBy);
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    response.status(200).send(result.recordset);
                }
                else {
                    response.status(405).send('Unacceptable operation.');
                }
            });
        });
    }
    catch (error) {
        response.status(405).send('Unacceptable operation.');
    }
};
exports.reprographeGETList = reprographeGETList;
const etudiantGETList = (request, response) => {
    try {
        const params = request.params;
        const page = params.pageNumber;
        const rowsNumber = params.rowsNumber;
        const orderBy = params.orderBy;
        mssql_1.default.connect(config).then((pool) => {
            console.log(user_model_1.utilisateurColumns[orderBy]);
            const queryGET = (0, user_model_1.queryPaginatedEtudiantGET)(page, rowsNumber, orderBy);
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    response.status(200).send(result.recordset);
                }
                else {
                    response.status(405).send('Unacceptable operation.');
                }
            });
        });
    }
    catch (error) {
        response.status(405).send('Unacceptable operation.');
    }
};
exports.etudiantGETList = etudiantGETList;
const attachePromoGETList = (request, response) => {
    try {
        const params = request.params;
        const page = params.pageNumber;
        const rowsNumber = params.rowsNumber;
        const orderBy = params.orderBy;
        mssql_1.default.connect(config).then((pool) => {
            console.log(user_model_1.utilisateurColumns[orderBy]);
            const queryGET = (0, user_model_1.queryPaginatedAttachePromoGET)(page, rowsNumber, orderBy);
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    response.status(200).send(result.recordset);
                }
                else {
                    response.status(405).send('Unacceptable operation.');
                }
            });
        });
    }
    catch (error) {
        response.status(405).send('Unacceptable operation.');
    }
};
exports.attache_promoGETList = attachePromoGETList;
const intervenantGETList = (request, response) => {
    try {
        const params = request.params;
        const page = params.pageNumber;
        const rowsNumber = params.rowsNumber;
        const orderBy = params.orderBy;
        mssql_1.default.connect(config).then((pool) => {
            console.log(user_model_1.utilisateurColumns[orderBy]);
            const queryGET = (0, user_model_1.queryPaginatedIntervenantPromoGET)(page, rowsNumber, orderBy);
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    response.status(200).send(result.recordset);
                }
                else {
                    response.status(405).send('Unacceptable operation.');
                }
            });
        });
    }
    catch (error) {
        response.status(405).send('Unacceptable operation.');
    }
};
exports.intervenantGETList = intervenantGETList;
const responsablePedagogiqueGETList = (request, response) => {
    try {
        const params = request.params;
        const page = params.pageNumber;
        const rowsNumber = params.rowsNumber;
        const orderBy = params.orderBy;
        mssql_1.default.connect(config).then((pool) => {
            console.log(user_model_1.utilisateurColumns[orderBy]);
            const queryGET = (0, user_model_1.queryPaginatedResponsablePedagogiqueGET)(page, rowsNumber, orderBy);
            pool
                .request()
                .query(queryGET)
                .then((result) => {
                if (result) {
                    response.status(200).send(result.recordset);
                }
                else {
                    response.status(405).send('Unacceptable operation.');
                }
            });
        });
    }
    catch (error) {
        response.status(405).send('Unacceptable operation.');
    }
};
exports.responsablePedagogiqueGETList = responsablePedagogiqueGETList;
//# sourceMappingURL=roles-controller.js.map