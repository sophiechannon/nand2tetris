import * as fs from "fs";

class CodeWriter {
  constructor(outputFilePath: string) {
    const createFile = fs.writeFileSync(outputFilePath, "");
  }

  setFileName(fileName: string) {}

  writeArithmetic(command: string) {}

  writePushPop(command: string) {}

  close() {}
}
