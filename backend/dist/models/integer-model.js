"use strict";
// faire un validateur sur les requêtes POST !!!
const isId = (idToTest) => {
    idToTest.forEach((element) => {
        if (!Number.isInteger(element)) {
            return false;
        }
    });
    return true;
};
module.exports = isId;
//# sourceMappingURL=integer-model.js.map