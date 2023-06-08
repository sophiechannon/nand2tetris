import * as fs from "fs";

class CodeWriter {
  name: string;

  constructor(outputFilePath: string) {
    const createFile = fs.writeFileSync(outputFilePath, "");
    this.name = "";
  }

  setFileName(fileName: string) {
    this.name = fileName;
  }

  writeArithmetic(command: string) {
    // add
    // @SP
    // M = M - 1
    // A = M
    // D = M
    // @SP
    // M = M - 1
    // A = M
    // M = A + D
    // M = M + 1
  }

  writePushPop(command: "C_PUSH" | "C_POP", segment: string, index: number) {
    // the push command is then implemented by storing x at the array entry pointed by sp and then
    // incrementing sp (i.e., stack[sp]=x; sp=sp+1). The pop operation is implemented
    // by first decrementing sp and then returning the value stored in the top position (i.e.,
    // sp=sp-1; return stack[sp]).
    // push
    // @SP
    // A=M
    // M=x
    // M=M + 1
    //
  }

  close() {}
}
