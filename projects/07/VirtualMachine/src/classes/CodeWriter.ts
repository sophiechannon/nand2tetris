import * as fs from "fs";
import {
  AC,
  ARITHMETIC_COMMANDS,
  SEGMENT_MAP,
  Segment,
} from "../types/types.js";
import {
  incrementSP,
  popFromTop,
  initialCode,
  pushToStack,
} from "../utils/util.js";

export class CodeWriter {
  name: string;
  outputDir: string;
  path: string;
  compCounter: number;
  fileDescriptor?: number;

  constructor(outputFilePath: string) {
    this.outputDir = outputFilePath;
    this.path = "";
    this.name = "";
    this.compCounter = 0;
    this.fileDescriptor = undefined;
  }

  setFileName(fileName: string) {
    this.name = fileName;
    const dir = this.outputDir + "/" + fileName + ".asm";
    this.path = dir;
    this.fileDescriptor = fs.openSync(dir, "w");
    this.#initializeStack(dir);
  }

  writeArithmetic(command: string) {
    let operation = "";
    if (["add", "sub", "and", "or"].includes(command)) {
      operation = this.#binaryOperation(command);
    } else if (["neg", "not"].includes(command)) {
      operation = this.#unaryOperation(command);
    } else if (["eq", "gt", "lt"]) {
      operation = this.#compareOperation(command);
      this.compCounter++;
    }
    fs.appendFileSync(this.path, operation);
  }

  writePushPop(command: string, segment: string, index?: number) {
    if (index === undefined) return;
    let result = "";
    if (command === "C_PUSH") {
      result = this.#push(segment, index);
    } else {
      console.log("poppin");

      result = this.#pop(segment, index);
    }
    fs.appendFileSync(this.path, result);
  }

  close() {
    fs.appendFileSync(this.path, `(END)\n` + `@END\n` + `0;JMP`);
    if (this.fileDescriptor) fs.close(this.fileDescriptor);
  }

  #initializeStack(path: string) {
    fs.writeFileSync(path, initialCode);
  }

  #unaryOperation(op: string) {
    return (
      popFromTop + `M=${ARITHMETIC_COMMANDS[op as keyof AC]}M\n` + incrementSP
    );
  }

  #binaryOperation(op: string) {
    return (
      popFromTop +
      `D=M\n` +
      popFromTop +
      `M=M${ARITHMETIC_COMMANDS[op as keyof AC]}D\n` +
      incrementSP
    );
  }

  #compareOperation(op: string) {
    return (
      popFromTop +
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
      incrementSP
    );
  }

  #push(segment: string, index: number) {
    if (segment === "constant") {
      return `@${index}\n` + `D=A\n` + pushToStack;
    } else if (["local", "argument", "this", "that"].includes(segment)) {
      return (
        `@${index}\n` +
        `D=A\n` +
        // set D to the constant index e.g. 4
        `@${SEGMENT_MAP[segment as keyof Segment]}\n` +
        `A=M\n` +
        // set A to value of local
        `D=D+A\n` +
        // set D to what is saved there
        pushToStack
      );
    }
    return "";
  }

  #pop(segment: string, index: number) {
    if (segment === "constant") {
      return popFromTop + `D=M\n` + `@${index}\n` + `M=D\n`;
    } else if (["local", "argument", "this", "that"].includes(segment)) {
      console.log(segment, "segment");
      return (
        `@${index}\n` +
        `D=A\n` +
        // set D to the constant index e.g. 4
        `@${SEGMENT_MAP[segment as keyof Segment]}\n` +
        `A=M\n` +
        // e.g. Local / 50 + 4
        `D=D+A\n` +
        // set D to what is saved there
        `@R13\n` +
        `M=D\n` +
        popFromTop +
        // `@SP\n` + `M=M-1\n` + `A=M\n`
        `D=M\n` +
        `@R13\n` +
        `A=M\n` +
        `M=D\n`
      );
    }
    return "";
  }
}

// The pop operation is implemented
// by first decrementing sp and then returning the value stored in the top position (i.e.,
// sp=sp-1; return stack[sp]).