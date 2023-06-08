"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandOrArg = exports.COMMAND_TYPE_MAP = void 0;
exports.COMMAND_TYPE_MAP = {
    add: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
    sub: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
    neg: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
    eq: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
    gt: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
    lt: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
    and: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
    or: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
    not: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
    pop: { type: "C_POP", arg1: true, arg2: true },
    push: { type: "C_PUSH", arg1: true, arg2: true },
    label: { type: "C_LABEL", arg1: true, arg2: false },
    goto: { type: "C_GOTO", arg1: true, arg2: false },
    "if-goto": { type: "C_IF", arg1: true, arg2: false },
    function: { type: "C_FUNCTION", arg1: true, arg2: true },
    return: { type: "C_RETURN", arg1: false, arg2: false },
    call: { type: "C_CALL", arg1: true, arg2: true },
};
const getCommandOrArg = (line, index) => line === null || line === void 0 ? void 0 : line.split(" ")[index];
exports.getCommandOrArg = getCommandOrArg;
//# sourceMappingURL=util.js.map