"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = __importDefault(require("../../middleware/is-auth"));
const roles_middleware_1 = require("../../middleware/roles-middleware");
const roles_controller_1 = require("../../controllers/users/roles-controller");
const router = express_1.default.Router();
router.post('/roles/', is_auth_1.default, roles_middleware_1.isAdmin, roles_controller_1.newRolePOST);
router.get('/roles/reprographes/page/:pageNumber/rows/:rowsNumber/order/:orderBy/', is_auth_1.default, roles_middleware_1.isEducationManager, roles_controller_1.reprographeGETList);
router.get('/roles/etudiants/page/:pageNumber/rows/:rowsNumber/order/:orderBy/', is_auth_1.default, roles_middleware_1.isEducationManager, roles_controller_1.etudiantGETList);
router.get('/roles/attache_promo/page/:pageNumber/rows/:rowsNumber/order/:orderBy/', is_auth_1.default, roles_middleware_1.isEducationManager, roles_controller_1.attache_promoGETList);
router.get('/roles/intervenant/page/:pageNumber/rows/:rowsNumber/order/:orderBy/', is_auth_1.default, roles_middleware_1.isEducationManager, roles_controller_1.intervenantGETList);
router.get('/roles/responsable_pedago/page/:pageNumber/rows/:rowsNumber/order/:orderBy/', is_auth_1.default, roles_middleware_1.isEducationManager, roles_controller_1.responsablePedagogiqueGETList);
module.exports = router;
//# sourceMappingURL=roles-route.js.map