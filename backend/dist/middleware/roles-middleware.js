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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEducationManager = exports.isAdmin = exports.isRolesPOSTModel = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const secretPass = __importStar(require("../CONFIG-FILES/secret-password.json"));
const string_regex_1 = require("../Regex/string-regex");
const roles_model_1 = require("../models/users/roles-model");
const isRolesPOSTModel = (req, res, next) => {
    try {
        const body = req.body;
        const rolesPOSTRequestbody = {
            libelleRole: body.libelleRole,
            droits: body.droits,
        };
        if ((0, string_regex_1.onlyLowercaseRegExp)([body.libelleRole, body.droits])) {
            next();
        }
        else {
            throw TypeError;
        }
    }
    catch (error) {
        res.status(403).send('Forbidden request parameters.');
    }
};
exports.isRolesPOSTModel = isRolesPOSTModel;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.get('Authorization');
        yield hasTheRights(authHeader, ['admin']).then((isRightRole) => {
            if (isRightRole) {
                next();
            }
            else {
                res.status(401).send('Unauthorized request.');
            }
        });
    }
    catch (error) {
        res.status(403).send('Forbidden request parameters.');
    }
});
exports.isAdmin = isAdmin;
const isEducationManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.get('Authorization');
        yield hasTheRights(authHeader, [
            roles_model_1.isRightRoleEnum.ADMIN,
            roles_model_1.isRightRoleEnum.ATTACHE_PROMO,
            roles_model_1.isRightRoleEnum.REPROGRAPHE,
            roles_model_1.isRightRoleEnum.RESPONSABLE_PEDA,
        ]).then((isRightRole) => {
            if (isRightRole) {
                next();
            }
            else {
                res.status(401).send('Unauthorized request.');
            }
        });
    }
    catch (error) {
        res.status(403).send('Forbidden request parameters.');
    }
});
exports.isEducationManager = isEducationManager;
const hasTheRights = (authHeader, roles) => __awaiter(void 0, void 0, void 0, function* () {
    const token = authHeader.replace('Bearer ', '');
    return yield decodeToken(token).then((decodedToken) => {
        if (roles.includes(decodedToken.aud)) {
            return true;
        }
        else {
            return false;
        }
    });
});
function decodeToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const decodedToken = jwt.verify(token, secretPass.passwordToken);
        return decodedToken;
    });
}
//# sourceMappingURL=roles-middleware.js.map