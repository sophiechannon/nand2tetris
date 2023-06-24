import Path from "path";
import * as fs from "fs";

export const getCommandOrArg = (line: string, index: number) =>
  line?.split(" ")[index]?.trim();

export const incrementSP = `@SP\n` + `M=M+1\n`;

export const popFromTop = `@SP\n` + `M=M-1\n` + `A=M\n`;

export const pushToStack = `@SP\n` + `A=M\n` + `M=D\n` + incrementSP;

export const initialCode = `@256\n` + `D=A\n` + `@SP\n` + `M=D\n`;

export const isVMFile = (file: string) => Path.parse(file).ext === ".vm";

export const getDirectory = (path: string) =>
  Path.parse(path).ext ? Path.parse(path).dir : path;

export const getVMFiles = (path: string) =>
  fs
    .readdirSync(path)
    .filter((file) => isVMFile(file))
    .map((file) => path + "/" + file);
