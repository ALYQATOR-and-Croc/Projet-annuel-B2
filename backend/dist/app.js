"use strict";
// import tokenGenerator from './controllers/token-generator-dev';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = __importStar(require("./config.json"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_route_1 = __importDefault(require("./routes/auth/auth-route"));
const roles_route_1 = __importDefault(require("./routes/users/roles-route"));
const campus_route_1 = __importDefault(require("./routes/infrastructure/campus-route"));
const school_route_1 = __importDefault(require("./routes/infrastructure/school-route"));
const student_class_route_1 = __importDefault(require("./routes/education/student-class-route"));
const promotion_routes_1 = __importDefault(require("./routes/education/promotion-routes"));
const room_route_1 = __importDefault(require("./routes/infrastructure/room-route"));
const matiere_route_1 = __importDefault(require("./routes/education/matiere-route"));
const course_route_1 = __importDefault(require("./routes/education/course-route"));
const presence_route_1 = __importDefault(require("./routes/education/presence-route"));
const cors_1 = __importDefault(require("cors"));
const slq_test_middleware_1 = require("./middleware/slq-test-middleware");
const app = (0, express_1.default)();
const portHost = config.HOST;
const API_URL = config.API;
app.use(body_parser_1.default.json());
///// 1
// app.use(
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.header("Access-Control-Allow-Origin", API_URL); // update to match the domain you will make the request from
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   }
// );
///// 2
app.use((0, cors_1.default)());
app.use(slq_test_middleware_1.sqlServerTest);
// app.use(tokenGenerator);
app.use(auth_route_1.default);
app.use(roles_route_1.default);
app.use(campus_route_1.default);
app.use(school_route_1.default);
app.use(student_class_route_1.default);
app.use(promotion_routes_1.default);
app.use(room_route_1.default);
app.use(matiere_route_1.default);
app.use(course_route_1.default);
app.use(presence_route_1.default);
app.get("/", (request, response) => {
    response.send(request.body);
});
app.listen(portHost);
//# sourceMappingURL=app.js.map