"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = __importDefault(require("../../middleware/is-auth"));
const matiere_controller_1 = require("../../controllers/education/matiere-controller");
const router = express_1.default.Router();
router.post('/matiere/new/', is_auth_1.default, 
// isCourseManager,
matiere_controller_1.newMatierePOST);
module.exports = router;
//# sourceMappingURL=matiere-route.js.map