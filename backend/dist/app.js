"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_generator_dev_1 = __importDefault(require("./controllers/token-generator-dev"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_route_1 = __importDefault(require("./routes/auth/auth-route"));
const roles_route_1 = __importDefault(require("./routes/users/roles-route"));
const campus_route_1 = __importDefault(require("./routes/infrastructure/campus-route"));
const school_route_1 = __importDefault(require("./routes/infrastructure/school-route"));
const student_class_route_1 = __importDefault(require("./routes/education/student-class-route"));
const promotion_routes_1 = __importDefault(require("./routes/education/promotion-routes"));
const room_1 = __importDefault(require("./routes/infrastructure/room"));
const matiere_route_1 = __importDefault(require("./routes/education/matiere-route"));
const course_route_1 = __importDefault(require("./routes/education/course-route"));
const app = (0, express_1.default)();
const localhost = 5000;
const API_URL = 'http://localhost:3000';
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', API_URL); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(token_generator_dev_1.default);
app.use(auth_route_1.default);
app.use(roles_route_1.default);
app.use(campus_route_1.default);
app.use(school_route_1.default);
app.use(student_class_route_1.default);
app.use(promotion_routes_1.default);
app.use(room_1.default);
app.use(matiere_route_1.default);
app.use(course_route_1.default);
app.get('/', (request, response) => {
    response.send(request.body);
});
app.listen(localhost);
//# sourceMappingURL=app.js.map