"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = __importDefault(require("../../middleware/is-auth"));
const roles_middleware_1 = require("../../middleware/roles-middleware");
const campus_controller_1 = require("../../controllers/infrastructure/campus-controller");
const router = express_1.default.Router();
router.post('/campus/new/', is_auth_1.default, roles_middleware_1.isAdmin, 
// isCampusPOSTModel,
campus_controller_1.newCampusPOST);
module.exports = router;
//# sourceMappingURL=campus-route.js.map