import Path from "path";
import * as fs from "fs";
export const getCommandOrArg = (line, index) => { var _a; return (_a = line === null || line === void 0 ? void 0 : line.split(" ")[index]) === null || _a === void 0 ? void 0 : _a.trim(); };
export const incrementSP = `@SP\n` + `M=M+1\n`;
export const popFromTop = `@SP\n` + `M=M-1\n` + `A=M\n`;
export const pushToStack = `@SP\n` + `A=M\n` + `M=D\n` + incrementSP;
export const initialCode = `@256\n` + `D=A\n` + `@SP\n` + `M=D\n`;
export const isVMFile = (file) => Path.parse(file).ext === ".vm";
export const getDirectory = (path) => Path.parse(path).ext ? Path.parse(path).dir : path;
export const getVMFiles = (path) => fs
    .readdirSync(path)
    .filter((file) => isVMFile(file))
    .map((file) => path + "/" + file);
//# sourceMappingURL=util.js.map