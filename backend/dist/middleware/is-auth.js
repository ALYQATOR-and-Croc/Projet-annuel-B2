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
const jwt = __importStar(require("jsonwebtoken"));
const secretPass = __importStar(require("../CONFIG-FILES/secret-password.json"));
const isAuthenticated = (request, response, next) => {
    const authHeader = request.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        response.status(401).send(error);
        throw error;
    }
    const token = authHeader.replace('Bearer ', '');
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secretPass.passwordToken);
    }
    catch (error) {
        response.status(401).send('Not authenticated.');
        throw error;
    }
    next();
};
module.exports = isAuthenticated;
//# sourceMappingURL=is-auth.js.map