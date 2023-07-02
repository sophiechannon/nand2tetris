import * as fs from "fs";
import Path from "path";
import { AC, ARITHMETIC_COMMANDS } from "../types/types.js";
import {
  incrementSP,
  popFromTop,
  initialCode,
  pushToStack,
  popR1R12,
  pushR1R12,
  returnString,
  getCallString,
  getLabelString,
  getIfString,
  getJumpString,
} from "../utils/util.js";

export class CodeWriter {
  name: string;
  outputDir: string;
  outputFile: string;
  compCounter: number;
  funCounter: number;
  funName: string;
  fileDescriptor?: number;

  constructor(outputFilePath: string) {
    this.outputDir = outputFilePath;
    this.outputFile = this.outputDir + Path.parse(this.outputDir).name + ".asm";
    this.name = "";
    this.compCounter = 0;
    this.funCounter = 0;
    this.funName = "";
    this.fileDescriptor = fs.openSync(this.outputFile, "w");
    this.writeInit();
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
    this.#appendToFile(operation);
  }

  writePushPop(command: string, segment: string, index?: number) {
    if (index === undefined) return;
    let result = "";
    if (command === "C_PUSH") {
      result = this.#push(segment, index);
    } else {
      result = this.#pop(segment, index);
    }
    this.#appendToFile(result);
  }

  writeInit() {
    fs.writeFileSync(this.outputFile, initialCode);
    this.writeCall("Sys.init", 0);
  }

  writeLabel(label: string) {
    const labelString = getLabelString(label, this.funName);
    this.#appendToFile(labelString);
  }

  writeGoTo(label: string) {
    const goToString = getJumpString(label, "JMP", this.funName);
    this.#appendToFile(goToString);
  }

  writeIf(label: string) {
    const ifString = getIfString(label, this.funName);
    this.#appendToFile(ifString);
  }

  writeCall(functionName: string, numArgs: number) {
    this.funCounter++;
    const funName =
      functionName === "Sys.init"
        ? functionName
        : `${functionName}$${this.funCounter}`;
    const callString =
      getCallString(funName, numArgs) +
      getJumpString(functionName, "JMP") +
      getLabelString(`RETURN.${funName}`);
    this.#appendToFile(callString);
  }

  writeReturn() {
    this.#appendToFile(returnString);
  }

  writeFunction(functionName: string, numLocals: number) {
    this.funName = functionName;
    let counter = 0;
    let commands = getLabelString(functionName);
    while (counter < numLocals) {
      commands =
        commands +
        `@${counter}\n` +
        `D=A\n` +
        `@LCL\n` +
        `A=M+D\n` +
        `M=0\n` +
        incrementSP;
      counter++;
    }
    this.#appendToFile(commands);
  }

  close() {
    if (this.fileDescriptor) fs.close(this.fileDescriptor);
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
      getJumpString(
        `TRUE.${this.compCounter}`,
        `J${op.toUpperCase()}`,
        this.funName
      ) +
      `D=0\n` +
      getJumpString(`FINALLY.${this.compCounter}`, "JMP", this.funName) +
      getLabelString(`TRUE.${this.compCounter}`, this.funName) +
      `D=-1\n` +
      getLabelString(`FINALLY.${this.compCounter}`, this.funName) +
      `@SP\n` +
      `A=M\n` +
      `M=D\n` +
      incrementSP
    );
  }

  #push(segment: string, index: number) {
    if (segment === "constant") {
      return `@${index}\n` + `D=A\n` + pushToStack;
    }
    if (segment === "static") {
      return `@${this.name}.${index}\n` + `D=M\n` + pushToStack;
    }
    return pushR1R12(segment, index);
  }

  #pop(segment: string, index: number) {
    if (segment === "constant") {
      return popFromTop + `D=M\n` + `@${index}\n` + `M=D\n`;
    }
    if (segment === "static") {
      return popFromTop + `D=M\n` + `@${this.name}.${index}\n` + `M=D\n`;
    }
    return popR1R12(segment, index);
  }

  #appendToFile(string: string) {
    fs.appendFileSync(this.outputFile, string);
  }
}
