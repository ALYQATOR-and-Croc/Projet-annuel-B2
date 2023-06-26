"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../controllers/authentication"));
const router = express_1.default.Router();
router.post('/login/', authentication_1.default);
module.exports = router;
//# sourceMappingURL=login.js.map