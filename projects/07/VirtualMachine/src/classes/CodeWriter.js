var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CodeWriter_instances, _CodeWriter_unaryOperation, _CodeWriter_binaryOperation, _CodeWriter_compareOperation, _CodeWriter_push, _CodeWriter_pop;
import * as fs from "fs";
import Path from "path";
import { ARITHMETIC_COMMANDS } from "../types/types.js";
import { incrementSP, popFromTop, initialCode, pushToStack, popR1R12, pushR1R12, } from "../utils/util.js";
export class CodeWriter {
    constructor(outputFilePath) {
        _CodeWriter_instances.add(this);
        this.outputDir = outputFilePath;
        this.outputFile = this.outputDir + Path.parse(this.outputDir).name + ".asm";
        console.log(this.outputFile);
        this.name = "";
        this.compCounter = 0;
        this.fileDescriptor = fs.openSync(this.outputFile, "w");
        this.writeInit();
    }
    setFileName(fileName) {
        this.name = fileName;
    }
    writeArithmetic(command) {
        let operation = "";
        if (["add", "sub", "and", "or"].includes(command)) {
            operation = __classPrivateFieldGet(this, _CodeWriter_instances, "m", _CodeWriter_binaryOperation).call(this, command);
        }
        else if (["neg", "not"].includes(command)) {
            operation = __classPrivateFieldGet(this, _CodeWriter_instances, "m", _CodeWriter_unaryOperation).call(this, command);
        }
        else if (["eq", "gt", "lt"]) {
            operation = __classPrivateFieldGet(this, _CodeWriter_instances, "m", _CodeWriter_compareOperation).call(this, command);
            this.compCounter++;
        }
        fs.appendFileSync(this.outputFile, operation);
    }
    writePushPop(command, segment, index) {
        if (index === undefined)
            return;
        let result = "";
        if (command === "C_PUSH") {
            result = __classPrivateFieldGet(this, _CodeWriter_instances, "m", _CodeWriter_push).call(this, segment, index);
        }
        else {
            result = __classPrivateFieldGet(this, _CodeWriter_instances, "m", _CodeWriter_pop).call(this, segment, index);
        }
        fs.appendFileSync(this.outputFile, result);
    }
    close() {
        fs.appendFileSync(this.outputFile, `(END)\n` + `@END\n` + `0;JMP`);
        if (this.fileDescriptor)
            fs.close(this.fileDescriptor);
    }
    writeInit() {
        fs.writeFileSync(this.outputFile, initialCode);
    }
}
_CodeWriter_instances = new WeakSet(), _CodeWriter_unaryOperation = function _CodeWriter_unaryOperation(op) {
    return (popFromTop + `M=${ARITHMETIC_COMMANDS[op]}M\n` + incrementSP);
}, _CodeWriter_binaryOperation = function _CodeWriter_binaryOperation(op) {
    return (popFromTop +
        `D=M\n` +
        popFromTop +
        `M=M${ARITHMETIC_COMMANDS[op]}D\n` +
        incrementSP);
}, _CodeWriter_compareOperation = function _CodeWriter_compareOperation(op) {
    return (popFromTop +
        `D=M\n` +
        popFromTop +
        `D=M-D\n` +
        `@TRUE.${this.compCounter}\n` +
        `D;J${op.toUpperCase()}\n` +
        `D=0\n` +
        `@FINALLY.${this.compCounter}\n` +
        `0;JMP\n` +
        `(TRUE.${this.compCounter})\n` +
        `D=-1\n` +
        `(FINALLY.${this.compCounter})\n` +
        `@SP\n` +
        `A=M\n` +
        `M=D\n` +
        incrementSP);
}, _CodeWriter_push = function _CodeWriter_push(segment, index) {
    if (segment === "constant") {
        return `@${index}\n` + `D=A\n` + pushToStack;
    }
    if (segment === "static") {
        return `@${this.name}.${index}\n` + `D=M\n` + pushToStack;
    }
    return pushR1R12(segment, index);
}, _CodeWriter_pop = function _CodeWriter_pop(segment, index) {
    if (segment === "constant") {
        return popFromTop + `D=M\n` + `@${index}\n` + `M=D\n`;
    }
    if (segment === "static") {
        return popFromTop + `D=M\n` + `@${this.name}.${index}\n` + `M=D\n`;
    }
    return popR1R12(segment, index);
};
//# sourceMappingURL=CodeWriter.js.map