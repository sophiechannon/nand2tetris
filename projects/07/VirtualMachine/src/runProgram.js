"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runProgram = void 0;
const process_1 = __importDefault(require("process"));
const Parser_js_1 = require("./Parser.js");
const runProgram = () => {
    const p = new Parser_js_1.Parser(process_1.default.argv[2]);
    console.log(p.getFile());
};
exports.runProgram = runProgram;
(0, exports.runProgram)();
//# sourceMappingURL=runProgram.js.map