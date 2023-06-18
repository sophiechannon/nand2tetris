import * as fs from "fs";
import { AC, ARITHMETIC_COMMANDS } from "../types/types.js";
import { incrementSP, popFromTop, initialCode } from "../utils/util.js";

export class CodeWriter {
  fileDescriptor: number;
  name: string;
  path: string;
  compCounter: number;

  constructor(outputFilePath: string) {
    this.fileDescriptor = fs.openSync(outputFilePath, "w");
    this.path = outputFilePath;
    this.name = "";
    this.compCounter = 0;
    this.#initializeStack();
  }

  setFileName(fileName: string) {
    this.name = fileName;
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
    if (index) {
      const result = this.#push(index);
      fs.appendFileSync(this.path, result);
    }
  }

  close() {
    fs.appendFileSync(this.path, "(END)\n@END\n0;JMP");
    fs.close(this.fileDescriptor);
  }

  #initializeStack() {
    fs.writeFileSync(this.path, initialCode);
  }

  #unaryOperation(op: string) {
    return (
      popFromTop + `M=${ARITHMETIC_COMMANDS[op as keyof AC]}M\n` + incrementSP
    );
  }

  #binaryOperation(op: string) {
    return (
      popFromTop +
      `D=M\n` + // D = Memory[Memory[SP]]
      popFromTop +
      `M=M${ARITHMETIC_COMMANDS[op as keyof AC]}D\n` + // Memory[Memory[SP]] = Memory[Memory[SP]] +-&| D
      incrementSP
    );
  }

  #compareOperation(op: string) {
    return (
      popFromTop +
      `D=M\n` + // D = Memory[Memory[SP]]
      popFromTop + // D is set to value of top of stack, a is set to address of next down
      `D=M-D\n` + // minus the 2nd from top of stack from top of stack
      `@TRUE.${this.compCounter}\n` + // set a to @TRUE
      `D;J${op.toUpperCase()}\n` + // if D < = > 0 jump to true
      `D=0\n` + // set D to false if we haven't jumped
      `@FINALLY.${this.compCounter}\n` + // set a to finally
      `0;JMP\n` + // conditionally jump to finally
      `(TRUE.${this.compCounter})\n` +
      `D=-1\n` + // set D to true which is apparently -1
      `(FINALLY.${this.compCounter})\n` +
      `@SP\n` +
      `A=M\n` +
      `M=D\n` +
      incrementSP
    );
  }

  #push(index: number) {
    // just constant x atm
    return (
      `@${index}\n` +
      `D=A\n` + // set D to the constant value
      `@SP\n` + // set SP to that value
      `A=M\n` +
      `M=D\n` +
      incrementSP
    );
  }
}
