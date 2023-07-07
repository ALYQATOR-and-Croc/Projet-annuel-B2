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
exports.newSchoolPOST = void 0;
const school_model_1 = require("../../models/infrastructure/school-model");
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const newSchoolPOST = (request, response, next) => {
    const body = request.body;
    const sqlQueryData = {
        libelleEcole: body.libelleEcole,
        domaineEcole: body.domaineEcole,
    };
    mssql_1.default
        .connect(config)
        .then((pool) => {
        const query = `
        INSERT INTO ${school_model_1.SchoolEnum.NOM_TABLE} (${school_model_1.SchoolEnum.LIBELLE}, ${school_model_1.SchoolEnum.DOMAINE})
        VALUES 
        ('${sqlQueryData.libelleEcole}', '${sqlQueryData.domaineEcole}')
        `;
        return pool.request().query(query);
    })
        .then(() => {
        response.status(201).send('School Successfully created');
    });
};
exports.newSchoolPOST = newSchoolPOST;
//# sourceMappingURL=school-controller.js.map