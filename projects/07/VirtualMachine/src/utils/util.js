"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialCode = exports.popFromTop = exports.incrementSP = exports.getCommandOrArg = void 0;
const getCommandOrArg = (line, index) => line === null || line === void 0 ? void 0 : line.split(" ")[index];
exports.getCommandOrArg = getCommandOrArg;
exports.incrementSP = `@SP\n` + `M=M+1\n`;
exports.popFromTop = `@SP\n` +
    `M=M-1\n` +
    `A=M\n`;
exports.initialCode = `@256\nD=A\n@SP\nM=D\n`;
//# sourceMappingURL=util.js.map