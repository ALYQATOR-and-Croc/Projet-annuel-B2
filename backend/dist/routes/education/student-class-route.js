"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = __importDefault(require("../../middleware/is-auth"));
const roles_middleware_1 = require("../../middleware/roles-middleware");
const student_class_controller_1 = require("../../controllers/education/student-class-controller");
const router = express_1.default.Router();
router.post('/class/new/', is_auth_1.default, roles_middleware_1.isAdmin, student_class_controller_1.newClassPOST);
router.patch('/class/update/:id', is_auth_1.default, roles_middleware_1.isAdmin, student_class_controller_1.patchClassPOST);
module.exports = router;
//# sourceMappingURL=student-class-route.js.map