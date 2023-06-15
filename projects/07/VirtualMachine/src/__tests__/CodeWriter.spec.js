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
const CodeWriter_1 = require("../classes/CodeWriter");
const fs = __importStar(require("fs"));
const util_1 = require("../utils/util");
const testPath = "./src/__tests__/test.asm";
describe(CodeWriter_1.CodeWriter, () => {
    it("opens the file and writes initial asm code", () => {
        const c = new CodeWriter_1.CodeWriter(testPath);
        expect(fs.readFileSync(testPath).toString()).toEqual(util_1.initialCode);
        c.close();
    });
    it("adds", () => {
        const c = new CodeWriter_1.CodeWriter(testPath);
        c.writeArithmetic("add");
        expect(fs.readFileSync(testPath).toString()).toEqual(util_1.initialCode + util_1.popFromTop + `D=M\n` + util_1.popFromTop + `M=M+D\n` + util_1.incrementSP);
        c.close();
    });
    it("subtracts", () => {
        const c = new CodeWriter_1.CodeWriter(testPath);
        c.writeArithmetic("sub");
        expect(fs.readFileSync(testPath).toString()).toEqual(util_1.initialCode + util_1.popFromTop + `D=M\n` + util_1.popFromTop + `M=M-D\n` + util_1.incrementSP);
        c.close();
    });
    it("ands", () => {
        const c = new CodeWriter_1.CodeWriter(testPath);
        c.writeArithmetic("and");
        expect(fs.readFileSync(testPath).toString()).toEqual(util_1.initialCode + util_1.popFromTop + `D=M\n` + util_1.popFromTop + `M=M&D\n` + util_1.incrementSP);
        c.close();
    });
    it("ors", () => {
        const c = new CodeWriter_1.CodeWriter(testPath);
        c.writeArithmetic("or");
        expect(fs.readFileSync(testPath).toString()).toEqual(util_1.initialCode + util_1.popFromTop + `D=M\n` + util_1.popFromTop + `M=M|D\n` + util_1.incrementSP);
        c.close();
    });
    it("negates", () => {
        const c = new CodeWriter_1.CodeWriter(testPath);
        c.writeArithmetic("neg");
        expect(fs.readFileSync(testPath).toString()).toEqual(util_1.initialCode + util_1.popFromTop + `M=-M\n` + util_1.incrementSP);
        c.close();
    });
    it("not", () => {
        const c = new CodeWriter_1.CodeWriter(testPath);
        c.writeArithmetic("not");
        expect(fs.readFileSync(testPath).toString()).toEqual(util_1.initialCode + util_1.popFromTop + `M=!M\n` + util_1.incrementSP);
        c.close();
    });
    it("equals", () => {
        const c = new CodeWriter_1.CodeWriter(testPath);
        c.writeArithmetic("eq");
        expect(fs.readFileSync(testPath).toString()).toEqual(util_1.initialCode +
            util_1.popFromTop +
            `D=M\n` +
            util_1.popFromTop +
            `D=M-D\n` +
            `@TRUE\n` +
            `D;JEQ\n` +
            `D=0\n` +
            `@FINALLY\n` +
            `0;JMP\n` +
            `(TRUE)\n` +
            `D=-1\n` +
            `(FINALLY)\n` +
            `@SP\n` +
            `A=M\n` +
            `M=D\n` +
            util_1.incrementSP);
        c.close();
    });
    it("less than", () => {
        const c = new CodeWriter_1.CodeWriter(testPath);
        c.writeArithmetic("lt");
        expect(fs.readFileSync(testPath).toString()).toEqual(util_1.initialCode +
            util_1.popFromTop +
            `D=M\n` +
            util_1.popFromTop +
            `D=M-D\n` +
            `@TRUE\n` +
            `D;JLT\n` +
            `D=0\n` +
            `@FINALLY\n` +
            `0;JMP\n` +
            `(TRUE)\n` +
            `D=-1\n` +
            `(FINALLY)\n` +
            `@SP\n` +
            `A=M\n` +
            `M=D\n` +
            util_1.incrementSP);
        c.close();
    });
    it("greater than", () => {
        const c = new CodeWriter_1.CodeWriter(testPath);
        c.writeArithmetic("gt");
        expect(fs.readFileSync(testPath).toString()).toEqual(util_1.initialCode +
            util_1.popFromTop +
            `D=M\n` +
            util_1.popFromTop +
            `D=M-D\n` +
            `@TRUE\n` +
            `D;JGT\n` +
            `D=0\n` +
            `@FINALLY\n` +
            `0;JMP\n` +
            `(TRUE)\n` +
            `D=-1\n` +
            `(FINALLY)\n` +
            `@SP\n` +
            `A=M\n` +
            `M=D\n` +
            util_1.incrementSP);
        c.close();
    });
    it("pushes constants", () => {
        const c = new CodeWriter_1.CodeWriter(testPath);
        c.writePushPop("C_PUSH", "constant", 7);
        expect(fs.readFileSync(testPath).toString()).toEqual(util_1.initialCode + `@7\n` + `D=A\n` + `@SP\n` + `A=M\n` + `M=D\n` + util_1.incrementSP);
        c.close();
    });
});
//# sourceMappingURL=CodeWriter.spec.js.map