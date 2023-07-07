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
exports.newPromotionPOST = void 0;
const promotion_model_1 = require("../../models/education/promotion-model");
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const newPromotionPOST = (request, response, next) => {
    try {
        const body = request.body;
        const anneePromotion = new Date(body.anneePromotion)
            .toISOString()
            .replace('T', ' ')
            .slice(0, 19);
        const sqlQueryData = {
            libellePromotion: body.libellePromotion,
            anneePromotion,
            domainePromotion: body.domainePromotion,
            specialitePromotion: body.specialitePromotion,
            diplomePromotion: body.diplomePromotion,
            niveauEtude: body.niveauEtude,
            idEcole: body.idEcole,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            INSERT INTO ${promotion_model_1.PromotionEnum.NOM_TABLE} 
            (   ${promotion_model_1.PromotionEnum.LIBELLE}, 
                ${promotion_model_1.PromotionEnum.ANNEE}, 
                ${promotion_model_1.PromotionEnum.DOMAINE}, 
                ${promotion_model_1.PromotionEnum.SPECIALITE_PROMOTION}, 
                ${promotion_model_1.PromotionEnum.DIPLOME}, 
                ${promotion_model_1.PromotionEnum.NIVEAU_ETUDE}, 
                ${promotion_model_1.PromotionEnum.FK_ECOLE})
            VALUES 
            ('${sqlQueryData.libellePromotion}', 
            '${sqlQueryData.anneePromotion}', 
            '${sqlQueryData.domainePromotion}', 
            '${sqlQueryData.specialitePromotion}',
            '${sqlQueryData.diplomePromotion}',
            '${sqlQueryData.niveauEtude}',
            '${sqlQueryData.idEcole}')
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
exports.newPromotionPOST = newPromotionPOST;
//# sourceMappingURL=promotion-controller.js.map