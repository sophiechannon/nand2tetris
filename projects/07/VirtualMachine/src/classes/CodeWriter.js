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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CodeWriter_instances, _CodeWriter_initializeStack, _CodeWriter_unaryOperation, _CodeWriter_binaryOperation, _CodeWriter_compareOperation, _CodeWriter_push;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeWriter = void 0;
const fs = __importStar(require("fs"));
const types_1 = require("../types/types");
const util_1 = require("../utils/util");
class CodeWriter {
    constructor(outputFilePath) {
        _CodeWriter_instances.add(this);
        this.fileDescriptor = fs.openSync(outputFilePath, "w");
        this.path = outputFilePath;
        this.name = "";
        __classPrivateFieldGet(this, _CodeWriter_instances, "m", _CodeWriter_initializeStack).call(this);
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
        else {
            operation = __classPrivateFieldGet(this, _CodeWriter_instances, "m", _CodeWriter_compareOperation).call(this, command);
        }
        fs.appendFileSync(this.path, operation);
    }
    writePushPop(command, segment, index) {
        console.log("hi");
        if (index) {
            const result = __classPrivateFieldGet(this, _CodeWriter_instances, "m", _CodeWriter_push).call(this, index);
            fs.appendFileSync(this.path, result);
        }
    }
    close() {
        fs.appendFileSync(this.path, "(END)\n@END\n0;JMP");
        fs.close(this.fileDescriptor);
    }
}
exports.CodeWriter = CodeWriter;
_CodeWriter_instances = new WeakSet(), _CodeWriter_initializeStack = function _CodeWriter_initializeStack() {
    fs.writeFileSync(this.path, util_1.initialCode);
}, _CodeWriter_unaryOperation = function _CodeWriter_unaryOperation(op) {
    return (util_1.popFromTop + `M=${types_1.ARITHMETIC_COMMANDS[op]}M\n` + util_1.incrementSP);
}, _CodeWriter_binaryOperation = function _CodeWriter_binaryOperation(op) {
    return (util_1.popFromTop +
        `D=M\n` +
        util_1.popFromTop +
        `M=M${types_1.ARITHMETIC_COMMANDS[op]}D\n` +
        util_1.incrementSP);
}, _CodeWriter_compareOperation = function _CodeWriter_compareOperation(op) {
    return (util_1.popFromTop +
        `D=M\n` +
        util_1.popFromTop +
        `D=M-D\n` +
        `@TRUE\n` +
        `D;J${op.toUpperCase()}\n` +
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
}, _CodeWriter_push = function _CodeWriter_push(index) {
    return (`@${index}\n` +
        `D=A\n` +
        `@SP\n` +
        `A=M\n` +
        `M=D\n` +
        util_1.incrementSP);
};
//# sourceMappingURL=CodeWriter.js.map