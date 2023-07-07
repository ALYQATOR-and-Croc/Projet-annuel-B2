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
exports.newCampusPOST = void 0;
const campus_model_1 = require("../../models/infrastructure/campus-model");
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const newCampusPOST = (request, response, next) => {
    try {
        const body = request.body;
        const sqlQueryData = {
            libelleCampus: body.libelle_campus,
            adresseCampus: body.adresse_campus,
            codePostalCampus: body.codePostalCampus,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            INSERT INTO ${campus_model_1.CampusEnum.NOM_TABLE} (${campus_model_1.CampusEnum.LIBELLE}, ${campus_model_1.CampusEnum.ADRESSE}, ${campus_model_1.CampusEnum.CODEPOSTAL})
            VALUES 
            ('${sqlQueryData.libelleCampus}', '${sqlQueryData.adresseCampus}', '${sqlQueryData.codePostalCampus}')
            `;
            return pool.request().query(query);
        })
            .then(() => {
            response.status(201).send('Campus Successfully created');
        });
    }
    catch (error) {
        response.status(400);
    }
};
exports.newCampusPOST = newCampusPOST;
//# sourceMappingURL=campus-controller.js.map