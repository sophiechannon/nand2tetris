import process from "process";
import Path from "path";
import { Parser } from "./classes/Parser.js";
import { CodeWriter } from "./classes/CodeWriter.js";
export const translate = (path) => {
    const outputFilePath = path.split(".vm")[0] + ".asm";
    const c = new CodeWriter(outputFilePath);
    const p = new Parser(path);
    c.setFileName(Path.parse(path).name);
    while (p.hasMoreCommands()) {
        p.advance();
        if (p.commandType() === "C_ARITHMETIC") {
            c.writeArithmetic(p.arg1());
        }
        else if (p.commandType() === "C_PUSH" || p.commandType() === "C_POP") {
            c.writePushPop(p.commandType(), p.arg1(), p.arg2());
        }
    }
    c.close();
};
translate(process.argv[2]);
//# sourceMappingURL=main.js.map