"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../../controllers/auth/authentication");
const router = express_1.default.Router();
router.post('/signup/', authentication_1.signup);
router.post('/login/', authentication_1.login);
module.exports = router;
//# sourceMappingURL=auth-route.js.map