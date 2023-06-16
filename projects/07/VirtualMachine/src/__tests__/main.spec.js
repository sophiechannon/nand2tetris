"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const fs = __importStar(require("fs"));
const util_1 = require("../utils/util");
const simpleAdd = "../StackArithmetic/SimpleAdd/SimpleAdd.vm";
describe("translate", () => {
    it("translate the simple add file", () => {
        (0, main_1.translate)(simpleAdd);
        expect(fs.readFileSync(simpleAdd.split(".vm")[0] + ".asm").toString()).toEqual(util_1.initialCode +
            `@7\n` +
            `D=A\n` +
            `@SP\n` +
            `A=M\n` +
            `M=D\n` +
            util_1.incrementSP +
            `@8\n` +
            `D=A\n` +
            `@SP\n` +
            `A=M\n` +
            `M=D\n` +
            util_1.incrementSP +
            util_1.popFromTop +
            `D=M\n` +
            util_1.popFromTop +
            `M=M+D\n` +
            util_1.incrementSP +
            "(END)\n@END\n0;JMP");
    });
});
//# sourceMappingURL=main.spec.js.map