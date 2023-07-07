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
exports.newMatierePOST = void 0;
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const matiere_model_1 = require("../../models/education/matiere-model");
const newMatierePOST = (request, response) => {
    try {
        const body = request.body;
        const sqlQueryBody = {
            libelleMatiere: body.libelleMatiere,
            idEcole: body.idEcole,
            idIntervenant: body.idIntervenant,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            INSERT INTO ${matiere_model_1.MatiereEnum.NOM_TABLE}
            (${matiere_model_1.MatiereEnum.LIBELLE}, ${matiere_model_1.MatiereEnum.FK_ECOLE}, ${matiere_model_1.MatiereEnum.FK_INTERVENANT})
            VALUES
            ('${sqlQueryBody.libelleMatiere}', ${sqlQueryBody.idEcole}, ${sqlQueryBody.idIntervenant})
            `;
            return pool.request().query(query);
        })
            .then(() => {
            response.status(201).send('Matiere successfully created !');
        });
    }
    catch (error) {
        response.status(400).send('Bad Request');
    }
};
exports.newMatierePOST = newMatierePOST;
//# sourceMappingURL=matiere-controller.js.map