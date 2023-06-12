import * as fs from "fs";
import { ARITHMETIC_COMMANDS, binaryOperation, unaryOperation } from "./util";

class CodeWriter {
  name: string;
  path: string;

  constructor(outputFilePath: string) {
    fs.writeFileSync(outputFilePath, "");
    this.path = outputFilePath;
    this.name = "";
  }

  setFileName(fileName: string) {
    this.name = fileName;
  }

  writeArithmetic(command: string) {
    let operation = "";
    if (["add", "sub", "add", "or"].includes(command)) {
      operation = binaryOperation(command);
    } else if (["neg", "not"].includes(command)) {
      operation = unaryOperation(command);
    } else {
    }
    fs.writeFileSync(this.path, operation); //write this
  }

  writePushPop(command: "C_PUSH" | "C_POP", segment: string, index: number) {
    // the push command is then implemented by storing x at the array entry pointed by sp and then
    // incrementing sp (i.e., stack[sp]=x; sp=sp+1). The pop operation is implemented
    // by first decrementing sp and then returning the value stored in the top position (i.e.,
    // sp=sp-1; return stack[sp]).
    // push
  }

  close() {}
}
