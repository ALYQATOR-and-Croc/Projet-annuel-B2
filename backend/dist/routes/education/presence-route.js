"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promotion_controller_1 = require("../../controllers/education/promotion-controller");
const is_auth_1 = __importDefault(require("../../middleware/is-auth"));
const roles_middleware_1 = require("../../middleware/roles-middleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/course/presence/', is_auth_1.default, roles_middleware_1.isAdmin, promotion_controller_1.newPromotionPOST);
//# sourceMappingURL=presence-route.js.map