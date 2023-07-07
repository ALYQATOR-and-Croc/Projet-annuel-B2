"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_auth_1 = __importDefault(require("../middleware/is-auth"));
const calendar_controller_1 = __importDefault(require("../controllers/calendar-controller"));
const router = express_1.default.Router();
router.get('/calendar/user/:userId/timerange/:timerange/startdate/:startDate/enddate/:endDate', is_auth_1.default, calendar_controller_1.default);
module.exports = router;
//# sourceMappingURL=calendar-route.js.map