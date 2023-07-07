"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyLowercaseRegExp = void 0;
const regExp = /^[a-z]+$/;
const onlyLowercaseRegExp = (isOnlyLowercase) => {
    isOnlyLowercase.forEach((element) => {
        if (!element.match(regExp)) {
            return false;
        }
    });
    return true;
};
exports.onlyLowercaseRegExp = onlyLowercaseRegExp;
//# sourceMappingURL=string-regex.js.map