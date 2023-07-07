"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const integer_model_1 = __importDefault(require("../models/integer-model"));
const calendarGET = (request, response) => {
    const calendarBody = request.body;
    if ((0, integer_model_1.default)([calendarBody.userId])) {
        const userId = calendarBody.userId;
        const calendar = {
            userId,
            timeRange: calendarBody.timeRange,
            startDate: calendarBody.startDate,
            endDate: calendarBody.endDate,
        };
    }
};
module.exports = calendarGET;
//# sourceMappingURL=calendar-controller.js.map