import Path from "path";
import * as fs from "fs";
import { SEGMENT_MAP, Segment } from "../types/types.js";

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

const isTempOrPointer = (segment: string) =>
  ["temp", "pointer"].includes(segment);

export const popR1R12 = (segment: string, index: number) =>
  `@${index}\n` +
  `D=A\n` +
  `@${SEGMENT_MAP[segment as keyof Segment]}\n` +
  (isTempOrPointer(segment) ? `` : `A=M\n`) +
  `D=D+A\n` +
  `@R13\n` +
  `M=D\n` +
  popFromTop +
  `D=M\n` +
  `@R13\n` +
  `A=M\n` +
  `M=D\n`;

export const pushR1R12 = (segment: string, index: number) =>
  `@${index}\n` +
  `D=A\n` +
  `@${SEGMENT_MAP[segment as keyof Segment]}\n` +
  (isTempOrPointer(segment) ? `A=D+A\n` : `A=M+D\n`) +
  `D=M\n` +
  pushToStack;
