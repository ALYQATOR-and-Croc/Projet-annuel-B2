"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const login_1 = __importDefault(require("./routes/login"));
const app = (0, express_1.default)();
const localhost = 5000;
app.use(body_parser_1.default.json());
app.use(login_1.default);
app.get('/', (request, response) => {
    response.send(request.body);
});
app.listen(localhost);
//# sourceMappingURL=app.js.map