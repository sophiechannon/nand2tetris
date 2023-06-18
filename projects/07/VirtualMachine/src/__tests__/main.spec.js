import { main } from "../main";
import * as fs from "fs";
import { initialCode, popFromTop, incrementSP } from "../utils/util";
const simpleAdd = "../StackArithmetic/SimpleAdd/SimpleAdd.vm";
describe("translate", () => {
    it("translate the simple add file", () => {
        main(simpleAdd);
        expect(fs.readFileSync(simpleAdd.split(".vm")[0] + ".asm").toString()).toEqual(initialCode +
            `@7\n` +
            `D=A\n` +
            `@SP\n` +
            `A=M\n` +
            `M=D\n` +
            incrementSP +
            `@8\n` +
            `D=A\n` +
            `@SP\n` +
            `A=M\n` +
            `M=D\n` +
            incrementSP +
            popFromTop +
            `D=M\n` +
            popFromTop +
            `M=M+D\n` +
            incrementSP +
            "(END)\n@END\n0;JMP");
    });
});
//# sourceMappingURL=main.spec.js.map