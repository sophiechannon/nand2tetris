import * as fs from "fs";
import { AC, ARITHMETIC_COMMANDS } from "../types/types";
import { incrementSP, popFromTop } from "../utils/util";

export class CodeWriter {
  fileDescriptor: number;
  name: string;
  path: string;

  constructor(outputFilePath: string) {
    this.fileDescriptor = fs.openSync(outputFilePath, "w");
    this.path = outputFilePath;
    this.name = "";
    this.#initializeStack();
  }

  setFileName(fileName: string) {
    this.name = fileName;
  }

  writeArithmetic(command: string) {
    let operation = "";
    if (["add", "sub", "add", "or"].includes(command)) {
      operation = this.#binaryOperation(command);
    } else if (["neg", "not"].includes(command)) {
      operation = this.#unaryOperation(command);
    } else {
      operation = this.#compareOperation(command);
    }
    fs.appendFileSync(this.path, operation);
  }

  writePushPop(command: "C_PUSH" | "C_POP", segment: string, index: number) {
    // the push command is then implemented by storing x at the array entry pointed by sp and then
    // incrementing sp (i.e., stack[sp]=x; sp=sp+1). The pop operation is implemented
    // by first decrementing sp and then returning the value stored in the top position (i.e.,
    // sp=sp-1; return stack[sp]).
    const result = this.#push(index);
    fs.appendFileSync(this.path, result);
  }

  close() {
    fs.close(this.fileDescriptor);
  }

  #initializeStack() {
    const initialize = `@256\n` + `D=A\n` + `@SP\n` + `M=D\n`;
    fs.writeFileSync(this.path, initialize);
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
      `@TRUE\n` + // set a to @TRUE
      `D;J${op.toUpperCase()}\n` + // if D < = > 0 jump to true
      `D=0\n` + // set D to false if we haven't jumped
      `@FINALLY\n` + // set a to finally
      `0;JMP\n` + // conditionally jump to finally
      `(TRUE)\n` +
      `D=-1\n` + // set D to true which is apparently -1
      `(FINALLY)\n` +
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
