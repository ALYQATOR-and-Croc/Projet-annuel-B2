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
exports.getOneClassByCampusGET = exports.getOneClassByPromoGET = exports.getOneClassGET = exports.getAllClassGET = exports.deleteClassPOST = exports.patchClassPOST = exports.newClassPOST = void 0;
const config = __importStar(require("../../config.json"));
const mssql_1 = __importDefault(require("mssql"));
const student_class_model_1 = require("../../models/education/student-class-model");
const newClassPOST = (request, response) => {
    try {
        const body = request.body;
        const sqlQueryBody = {
            libelleClasse: body.libelleClasse,
            idPromotion: body.idPromotion,
            idCampus: body.idCampus,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            INSERT INTO ${student_class_model_1.StudClassEnum.NOM_TABLE}
            (${student_class_model_1.StudClassEnum.LIBELLE}, ${student_class_model_1.StudClassEnum.FK_CAMPUS}, ${student_class_model_1.StudClassEnum.FK_PROMOTION})
            VALUES
            ('${sqlQueryBody.libelleClasse}', '${sqlQueryBody.idCampus}', '${sqlQueryBody.idPromotion}')
            `;
            return pool.request().query(query);
        })
            .then(() => {
            response.status(201).send('Class successfully created !');
        });
    }
    catch (error) {
        response.status(400).send('Bad Request');
    }
};
exports.newClassPOST = newClassPOST;
const patchClassPOST = (request, response) => {
    try {
        const body = request.body;
        const sqlQueryBody = {
            libelleClasse: body.libelleClasse,
            idPromotion: body.idPromotion,
            idCampus: body.idCampus,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            PATCH ${student_class_model_1.StudClassEnum.NOM_TABLE}
            SET ${student_class_model_1.StudClassEnum.LIBELLE} = '${sqlQueryBody.libelleClasse}', ${student_class_model_1.StudClassEnum.FK_CAMPUS} = '${sqlQueryBody.idCampus}', ${student_class_model_1.StudClassEnum.FK_PROMOTION} = '${sqlQueryBody.idPromotion}'
            WHERE ${student_class_model_1.StudClassEnum.PK} = '${request.params.id}'
            `;
            return pool.request().query(query);
        })
            .then(() => {
            response.status(201).send('Class successfully updated !');
        });
    }
    catch (error) {
        response.status(400).send('Bad Request');
    }
};
exports.patchClassPOST = patchClassPOST;
const deleteClassPOST = (request, response) => {
    try {
        const body = request.body;
        const sqlQueryBody = {
            libelleClasse: body.libelleClasse,
            idPromotion: body.idPromotion,
            idCampus: body.idCampus,
        };
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            DELETE FROM ${student_class_model_1.StudClassEnum.NOM_TABLE}
            WHERE ${student_class_model_1.StudClassEnum.PK} = '${request.params.id}'
            `;
            return pool.request().query(query);
        })
            .then(() => {
            response.status(201).send('Class successfully deleted !');
        });
    }
    catch (error) {
        response.status(400).send('Bad Request');
    }
};
exports.deleteClassPOST = deleteClassPOST;
const getAllClassGET = (request, response) => {
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            SELECT * FROM ${student_class_model_1.StudClassEnum.NOM_TABLE}
            `;
            return pool.request().query(query);
        })
            .then((result) => {
            response.status(200).send(result.recordset);
        });
    }
    catch (error) {
        response.status(400).send('Bad Request');
    }
};
exports.getAllClassGET = getAllClassGET;
const getOneClassGET = (request, response) => {
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            SELECT * FROM ${student_class_model_1.StudClassEnum.NOM_TABLE}
            WHERE ${student_class_model_1.StudClassEnum.PK} = '${request.params.id}'
            `;
            return pool.request().query(query);
        })
            .then((result) => {
            response.status(200).send(result.recordset);
        });
    }
    catch (error) {
        response.status(400).send('Bad Request');
    }
};
exports.getOneClassGET = getOneClassGET;
const getOneClassByPromoGET = (request, response) => {
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `

            SELECT * FROM ${student_class_model_1.StudClassEnum.NOM_TABLE}
            WHERE ${student_class_model_1.StudClassEnum.FK_PROMOTION} = '${request.params.id}'
            `;
            return pool.request().query(query);
        })
            .then((result) => {
            response.status(200).send(result.recordset);
        });
    }
    catch (error) {
        response.status(400).send('Bad Request');
    }
};
exports.getOneClassByPromoGET = getOneClassByPromoGET;
const getOneClassByCampusGET = (request, response) => {
    try {
        mssql_1.default
            .connect(config)
            .then((pool) => {
            const query = `
            SELECT * FROM ${student_class_model_1.StudClassEnum.NOM_TABLE}
            WHERE ${student_class_model_1.StudClassEnum.FK_CAMPUS} = '${request.params.idCampus}'
            `;
            return pool.request().query(query);
        })
            .then((result) => {
            response.status(200).send(result.recordset);
        });
    }
    catch (error) {
        response.status(400).send('Bad Request');
    }
};
exports.getOneClassByCampusGET = getOneClassByCampusGET;
//# sourceMappingURL=student-class-controller.js.map