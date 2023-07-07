"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = __importDefault(require("../../middleware/is-auth"));
const course_middelware_1 = require("../../middleware/course-middelware");
const course_controller_1 = require("../../controllers/education/course-controller");
const router = express_1.default.Router();
router.post('/courses/new/', is_auth_1.default, course_middelware_1.isCourseManager, course_controller_1.newCoursePOST);
module.exports = router;
//# sourceMappingURL=courses-route.js.map