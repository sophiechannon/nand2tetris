import Path from "path";
import * as fs from "fs";

export const getCommandOrArg = (line: string, index: number) =>
  line?.split(" ")[index]?.trim();

export const incrementSP = `@SP\n` + `M=M+1\n`; // // Memory[SP] = Memory[SP] + 1

export const popFromTop =
  `@SP\n` + // set A register value of SP
  `M=M-1\n` + // Memory[SP] = Memory[SP] - 1
  `A=M\n`; // A = Memory[SP]

export const initialCode = `@256\nD=A\n@SP\nM=D\n`;

export const isVMFile = (file: string) => Path.parse(file).ext === ".vm";

export const getDirectory = (path: string) =>
  Path.parse(path).ext ? Path.parse(path).dir : path;

export const getVMFiles = (path: string) =>
  fs
    .readdirSync(path)
    .filter((file) => isVMFile(file))
    .map((file) => path + "/" + file);
