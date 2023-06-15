"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popFromTop = exports.incrementSP = exports.getCommandOrArg = void 0;
const getCommandOrArg = (line, index) => line === null || line === void 0 ? void 0 : line.split(" ")[index];
exports.getCommandOrArg = getCommandOrArg;
exports.incrementSP = `@SP\n` + `M=M+1\n`;
exports.popFromTop = `@SP\n` +
    `M=M-1\n` +
    `A=M\n`;
//# sourceMappingURL=util.js.map