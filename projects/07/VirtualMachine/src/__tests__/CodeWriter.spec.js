import { CodeWriter } from "../classes/CodeWriter";
import * as fs from "fs";
import { incrementSP, initialCode, popFromTop, pushToStack, } from "../utils/util";
const testPath = "./src/__tests__";
describe(CodeWriter, () => {
    it("opens the file and writes initial asm code", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode);
        c.close();
    });
    it("adds", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writeArithmetic("add");
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode + popFromTop + `D=M\n` + popFromTop + `M=M+D\n` + incrementSP);
        c.close();
    });
    it("subtracts", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writeArithmetic("sub");
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode + popFromTop + `D=M\n` + popFromTop + `M=M-D\n` + incrementSP);
        c.close();
    });
    it("ands", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writeArithmetic("and");
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode + popFromTop + `D=M\n` + popFromTop + `M=M&D\n` + incrementSP);
        c.close();
    });
    it("ors", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writeArithmetic("or");
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode + popFromTop + `D=M\n` + popFromTop + `M=M|D\n` + incrementSP);
        c.close();
    });
    it("negates", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writeArithmetic("neg");
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode + popFromTop + `M=-M\n` + incrementSP);
        c.close();
    });
    it("not", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writeArithmetic("not");
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode + popFromTop + `M=!M\n` + incrementSP);
        c.close();
    });
    it("equals", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writeArithmetic("eq");
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode +
            popFromTop +
            `D=M\n` +
            popFromTop +
            `D=M-D\n` +
            `@TRUE.0\n` +
            `D;JEQ\n` +
            `D=0\n` +
            `@FINALLY.0\n` +
            `0;JMP\n` +
            `(TRUE.0)\n` +
            `D=-1\n` +
            `(FINALLY.0)\n` +
            `@SP\n` +
            `A=M\n` +
            `M=D\n` +
            incrementSP);
        c.close();
    });
    it("less than", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writeArithmetic("lt");
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode +
            popFromTop +
            `D=M\n` +
            popFromTop +
            `D=M-D\n` +
            `@TRUE.0\n` +
            `D;JLT\n` +
            `D=0\n` +
            `@FINALLY.0\n` +
            `0;JMP\n` +
            `(TRUE.0)\n` +
            `D=-1\n` +
            `(FINALLY.0)\n` +
            `@SP\n` +
            `A=M\n` +
            `M=D\n` +
            incrementSP);
        c.close();
    });
    it("greater than", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writeArithmetic("gt");
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode +
            popFromTop +
            `D=M\n` +
            popFromTop +
            `D=M-D\n` +
            `@TRUE.0\n` +
            `D;JGT\n` +
            `D=0\n` +
            `@FINALLY.0\n` +
            `0;JMP\n` +
            `(TRUE.0)\n` +
            `D=-1\n` +
            `(FINALLY.0)\n` +
            `@SP\n` +
            `A=M\n` +
            `M=D\n` +
            incrementSP);
        c.close();
    });
    it("pushes constants", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writePushPop("C_PUSH", "constant", 7);
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode + `@7\n` + `D=A\n` + `@SP\n` + `A=M\n` + `M=D\n` + incrementSP);
        c.close();
    });
    it("pushes local", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writePushPop("C_PUSH", "local", 1);
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode +
            `@1\n` +
            `D=A\n` +
            `@LCL\n` +
            `A=M+D\n` +
            `D=M\n` +
            pushToStack);
        c.close();
    });
    it("pops this", () => {
        const c = new CodeWriter(testPath);
        c.setFileName("test");
        c.writePushPop("C_POP", "this", 4);
        expect(fs.readFileSync(testPath + "/test.asm").toString()).toEqual(initialCode +
            `@4\n` +
            `D=A\n` +
            `@THIS\n` +
            `A=M\n` +
            `D=D+A\n` +
            `@R13\n` +
            `M=D\n` +
            popFromTop +
            `D=M\n` +
            `@R13\n` +
            `A=M\n` +
            `M=D\n`);
        c.close();
    });
});
//# sourceMappingURL=CodeWriter.spec.js.map