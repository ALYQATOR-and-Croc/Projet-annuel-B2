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
/**
 * I want a controller page that manage the presence of students in a êculiar course for sql database
 */
// Path: backend\controllers\education\presence-controller.ts
// Compare this snippet from backend\routes\education\student-class-route.ts:
const express_1 = __importDefault(require("express"));
const mssql_1 = __importDefault(require("mssql"));
const config = __importStar(require("../../config.json"));
const router = express_1.default.Router();
const newPresencePOST = (req, res, next) => {
    try {
        // A function that get value from the request body, create an sql query and create a new row in the presence table
        const body = req.body;
        const idStudent = body.idStudent;
        const idCourse = body.idCourse;
        const date = body.date;
        // Create the sql query
        const sqlQuery = `INSERT INTO presence (idStudent, idCourse, date) VALUES (${idStudent}, ${idCourse}, ${date})`;
        // Create a new row in the presence table
        mssql_1.default
            .connect(config)
            .then((pool) => {
            return pool.request().query(sqlQuery);
        })
            .then((result) => {
            console.log(result);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    catch (error) { }
    res.status(200).json({ message: 'ok' });
};
// Get a course id and return all the presence of the course
const getPresenceByCourseIdPOST = (req, res, next) => {
    try {
        // A function that get value from the request body, create an sql query and create a new row in the presence table
        const body = req.body;
        const idCourse = body.idCourse;
        // Create the sql query
        const sqlQuery = `SELECT * FROM presence WHERE idCourse = ${idCourse}`;
        // Create a new row in the presence table
        mssql_1.default
            .connect(config)
            .then((pool) => {
            return pool.request().query(sqlQuery);
        })
            .then((result) => {
            console.log(result);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    catch (error) { }
    res.status(200).json({ message: 'ok' });
};
// Get a presence by id
const getPresenceByIdPOST = (req, res, next) => {
    try {
        // A function that get value from the request body, create an sql query and create a new row in the presence table
        const body = req.body;
        const idPresence = body.idPresence;
        // Create the sql query
        const sqlQuery = `SELECT * FROM presence WHERE idPresence = ${idPresence}`;
        // Create a new row in the presence table
        mssql_1.default
            .connect(config)
            .then((pool) => {
            return pool.request().query(sqlQuery);
        })
            .then((result) => {
            console.log(result);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    catch (error) { }
    res.status(200).json({ message: 'ok' });
};
// Get a student id and return all the presence of the student
const getPresenceByStudentIdPOST = (req, res, next) => {
    try {
        // A function that get value from the request body, create an sql query and create a new row in the presence table
        const body = req.body;
        const idStudent = body.idStudent;
        // Create the sql query
        const sqlQuery = `SELECT * FROM presence WHERE idStudent = ${idStudent}`;
        // Create a new row in the presence table
        mssql_1.default
            .connect(config)
            .then((pool) => {
            return pool.request().query(sqlQuery);
        })
            .then((result) => {
            console.log(result);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    catch (error) { }
    res.status(200).json({ message: 'ok' });
};
// Get a course and return all students attending the course with their name, surname and id, return the number of presence of each student at the matiere and the intervenant associated with the course and the intervenant name and surname and id
const getPresenceByCourseGET = (req, res, next) => {
    try {
        // A function that get value from the request body, create an sql query and create a new row in the presence table
        const urlParams = req.params;
        const idCourse = urlParams.idCourse;
        // Create the sql query  all students attending the course with their name, surname and id, return the number of presence of each student at the matiere and the intervenant associated with the course and the intervenant name and surname and id
        const sqlQuery = `
        SELECT student.idStudent, 
        student.name, 
        student.surname, 
        presence.idCourse, 
        presence.idStudent, 
        presence.date, 
        intervenant.idIntervenant, 
        intervenant.name, 
        intervenant.surname, 
        intervenant.idCourse, 
        course.idCourse, 
        course.name, 
        course.idIntervenant,
         course.idPromotion, 
         promotion.idPromotion,
          promotion.name, 
          promotion.idCampus, 
          campus.idCampus, 
          campus.name 
          FROM student, 
          presence, 
          intervenant, 
          course, 
          promotion, 
          campus 
          WHERE 
          presence.idCourse = ${idCourse} 
          AND presence.idStudent = student.idStudent 
          AND presence.idCourse = course.idCourse 
          AND course.idIntervenant = intervenant.idIntervenant 
          AND course.idPromotion = promotion.idPromotion 
          AND promotion.idCampus = campus.idCampus`;
        mssql_1.default
            .connect(config)
            .then((pool) => {
            return pool.request().query(sqlQuery);
        })
            .then((result) => {
            res.status(200).json(result.recordset);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    catch (error) { }
    res.status(200).json({ message: 'ok' });
};
//# sourceMappingURL=presence-controller.js.map