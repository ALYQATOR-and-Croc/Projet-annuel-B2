"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = __importDefault(require("../middleware/is-auth"));
const roles_middleware_1 = require("../middleware/roles-middleware");
const roles_controller_1 = require("../controllers/roles-controller");
const router = express_1.default.Router();
router.post('/roles/', is_auth_1.default, roles_middleware_1.isAdmin, roles_middleware_1.isRolesPOSTModel, roles_controller_1.newRolePOST);
module.exports = router;
//# sourceMappingURL=roles-route.js.map