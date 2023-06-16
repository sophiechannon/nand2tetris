"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const path_1 = __importDefault(require("path"));
const Parser_1 = require("./classes/Parser");
const CodeWriter_1 = require("./classes/CodeWriter");
const translate = (path) => {
    const outputFilePath = path.split(".vm")[0] + ".asm";
    const c = new CodeWriter_1.CodeWriter(outputFilePath);
    const p = new Parser_1.Parser(path);
    c.setFileName(path_1.default.parse(path).name);
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
exports.translate = translate;
//# sourceMappingURL=main.js.map