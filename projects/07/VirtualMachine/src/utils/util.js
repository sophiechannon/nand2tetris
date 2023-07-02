import Path from "path";
import * as fs from "fs";
import { SEGMENT_MAP } from "../types/types.js";
export const getCommandOrArg = (line, index) => { var _a; return (_a = line === null || line === void 0 ? void 0 : line.split(" ")[index]) === null || _a === void 0 ? void 0 : _a.trim(); };
export const incrementSP = `@SP\n` + `M=M+1\n`;
export const popFromTop = `@SP\n` + `M=M-1\n` + `A=M\n`;
export const pushToStack = `@SP\n` + `A=M\n` + `M=D\n` + incrementSP;
export const initialCode = `@256\n` + `D=A\n` + `@SP\n` + `M=D\n`;
export const isVMFile = (file) => Path.parse(file).ext === ".vm";
export const getDirectory = (path) => {
    const newPath = Path.parse(path).ext ? Path.parse(path).dir : path;
    return newPath.endsWith("/") ? newPath : newPath + "/";
};
export const getVMFiles = (path) => fs
    .readdirSync(path)
    .filter((file) => isVMFile(file))
    .map((file) => path + "/" + file);
const isTempOrPointer = (segment) => ["temp", "pointer"].includes(segment);
export const popR1R12 = (segment, index) => `@${index}\n` +
    `D=A\n` +
    `@${SEGMENT_MAP[segment]}\n` +
    (isTempOrPointer(segment) ? `` : `A=M\n`) +
    `D=D+A\n` +
    `@R13\n` +
    `M=D\n` +
    popFromTop +
    `D=M\n` +
    `@R13\n` +
    `A=M\n` +
    `M=D\n`;
export const pushR1R12 = (segment, index) => `@${index}\n` +
    `D=A\n` +
    `@${SEGMENT_MAP[segment]}\n` +
    (isTempOrPointer(segment) ? `A=D+A\n` : `A=M+D\n`) +
    `D=M\n` +
    pushToStack;
const resetSegment = (segment) => `@13\n` + `M=M-1\n` + `A=M\n` + `D=M\n` + `@${segment}\n` + `M=D\n`;
export const returnString = `@LCL\n` +
    `A=M\n` +
    `D=A\n` +
    `@R13\n` +
    `M=D\n` +
    `@5\n` +
    `A=D-A\n` +
    `D=M\n` +
    `@R14\n` +
    `M=D\n` +
    `@ARG\n` +
    `D=M\n` +
    popFromTop +
    `D=M\n` +
    `@ARG\n` +
    `A=M\n` +
    `M=D\n` +
    `@ARG\n` +
    `A=M + 1\n` +
    `D=A\n` +
    `@SP\n` +
    `M=D\n` +
    resetSegment("THAT") +
    resetSegment("THIS") +
    resetSegment("ARG") +
    resetSegment("LCL") +
    `@R14\n` +
    `A=M\n` +
    `0;JMP\n`;
export const getCallString = (funName, numArgs) => `@RETURN.${funName}\n` +
    `D=A\n` +
    pushToStack +
    `@LCL\n` +
    `A=M\n` +
    `D=A\n` +
    pushToStack +
    `@ARG\n` +
    `A=M\n` +
    `D=A\n` +
    pushToStack +
    `@THIS\n` +
    `A=M\n` +
    `D=A\n` +
    pushToStack +
    `@THAT\n` +
    `A=M\n` +
    `D=A\n` +
    pushToStack +
    `@${numArgs}\n` +
    `D=A\n` +
    `@5\n` +
    `A=D+A\n` +
    `D=A\n` +
    `@SP\n` +
    `A=M\n` +
    `D=A-D\n` +
    `@ARG\n` +
    `M=D\n` +
    `@SP\n` +
    `A=M\n` +
    `D=A\n` +
    `@LCL\n` +
    `M=D\n`;
export const getLabelString = (label, funName) => `(${funName ? funName + "$" : ""}${label})\n`;
export const getJumpString = (label, jumpType, funName) => {
    const jumpRef = jumpType === "JMP" ? "0" : "D";
    return `@${funName ? funName + "$" : ""}${label}\n${jumpRef};${jumpType}\n`;
};
export const getIfString = (label, funName) => popFromTop + `D=M\n` + getJumpString(label, "JNE", funName);
//# sourceMappingURL=util.js.map