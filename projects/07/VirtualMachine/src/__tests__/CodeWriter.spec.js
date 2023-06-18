import { CodeWriter } from "../classes/CodeWriter";
import * as fs from "fs";
import { incrementSP, initialCode, popFromTop } from "../utils/util";
const testPath = "./src/__tests__/test.asm";
describe(CodeWriter, () => {
    it("opens the file and writes initial asm code", () => {
        const c = new CodeWriter(testPath);
        expect(fs.readFileSync(testPath).toString()).toEqual(initialCode);
        c.close();
    });
    it("adds", () => {
        const c = new CodeWriter(testPath);
        c.writeArithmetic("add");
        expect(fs.readFileSync(testPath).toString()).toEqual(initialCode + popFromTop + `D=M\n` + popFromTop + `M=M+D\n` + incrementSP);
        c.close();
    });
    it("subtracts", () => {
        const c = new CodeWriter(testPath);
        c.writeArithmetic("sub");
        expect(fs.readFileSync(testPath).toString()).toEqual(initialCode + popFromTop + `D=M\n` + popFromTop + `M=M-D\n` + incrementSP);
        c.close();
    });
    it("ands", () => {
        const c = new CodeWriter(testPath);
        c.writeArithmetic("and");
        expect(fs.readFileSync(testPath).toString()).toEqual(initialCode + popFromTop + `D=M\n` + popFromTop + `M=M&D\n` + incrementSP);
        c.close();
    });
    it("ors", () => {
        const c = new CodeWriter(testPath);
        c.writeArithmetic("or");
        expect(fs.readFileSync(testPath).toString()).toEqual(initialCode + popFromTop + `D=M\n` + popFromTop + `M=M|D\n` + incrementSP);
        c.close();
    });
    it("negates", () => {
        const c = new CodeWriter(testPath);
        c.writeArithmetic("neg");
        expect(fs.readFileSync(testPath).toString()).toEqual(initialCode + popFromTop + `M=-M\n` + incrementSP);
        c.close();
    });
    it("not", () => {
        const c = new CodeWriter(testPath);
        c.writeArithmetic("not");
        expect(fs.readFileSync(testPath).toString()).toEqual(initialCode + popFromTop + `M=!M\n` + incrementSP);
        c.close();
    });
    it("equals", () => {
        const c = new CodeWriter(testPath);
        c.writeArithmetic("eq");
        expect(fs.readFileSync(testPath).toString()).toEqual(initialCode +
            popFromTop +
            `D=M\n` +
            popFromTop +
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
            incrementSP);
        c.close();
    });
    it("less than", () => {
        const c = new CodeWriter(testPath);
        c.writeArithmetic("lt");
        expect(fs.readFileSync(testPath).toString()).toEqual(initialCode +
            popFromTop +
            `D=M\n` +
            popFromTop +
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
            incrementSP);
        c.close();
    });
    it("greater than", () => {
        const c = new CodeWriter(testPath);
        c.writeArithmetic("gt");
        expect(fs.readFileSync(testPath).toString()).toEqual(initialCode +
            popFromTop +
            `D=M\n` +
            popFromTop +
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
            incrementSP);
        c.close();
    });
    it("pushes constants", () => {
        const c = new CodeWriter(testPath);
        c.writePushPop("C_PUSH", "constant", 7);
        expect(fs.readFileSync(testPath).toString()).toEqual(initialCode + `@7\n` + `D=A\n` + `@SP\n` + `A=M\n` + `M=D\n` + incrementSP);
        c.close();
    });
});
//# sourceMappingURL=CodeWriter.spec.js.map