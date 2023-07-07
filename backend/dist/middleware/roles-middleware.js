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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isRolesPOSTModel = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const secretPass = __importStar(require("../CONFIG-FILES/secret-password.json"));
const string_regex_1 = require("../Regex/string-regex");
const ADMIN_RIGHTS = 'admin';
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
const isAdmin = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        const token = authHeader.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, secretPass.passwordToken);
        if (decodedToken.aud !== 'admin') {
            throw new Error('Not authorized');
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).send(error);
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=roles-middleware.js.map