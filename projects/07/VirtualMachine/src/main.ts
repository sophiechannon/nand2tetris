import process from "process";
import Path from "path";
import { Parser } from "./classes/Parser.js";
import { CodeWriter } from "./classes/CodeWriter.js";
import { getDirectory, getVMFiles } from "./utils/util.js";

export const main = (path: string) => {
  const outputFilePath = getDirectory(path);
  const directory = getVMFiles(outputFilePath);
  const c = new CodeWriter(outputFilePath);

  for (const file of directory) {
    const p = new Parser(file);
    c.setFileName(Path.parse(file).name);
    while (p.hasMoreCommands()) {
      p.advance();
      if (p.commandType() === "C_ARITHMETIC") {
        console.log("arith", p.arg1());
        c.writeArithmetic(p.arg1());
      } else if (p.commandType() === "C_PUSH" || p.commandType() === "C_POP") {
        console.log(p.commandType(), p.arg1(), p.arg2());
        c.writePushPop(p.commandType(), p.arg1(), p.arg2());
      }
    }
    c.close();
  }
};

main(process.argv[2]);
