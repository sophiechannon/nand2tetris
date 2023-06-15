"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const fs = __importStar(require("fs"));
const util_1 = require("../utils/util");
const types_1 = require("../types/types");
class Parser {
    constructor(filePath) {
        const openFile = fs.readFileSync(filePath, "utf8");
        this.file = openFile.split("\n");
        this.counter = 0;
        this.currentCommand = "";
    }
    getFile() {
        return this.file;
    }
    hasMoreCommands() {
        return this.counter < this.file.length;
    }
    advance() {
        this.currentCommand = this.file[this.counter];
        this.counter++;
    }
    commandType() {
        const command = (0, util_1.getCommandOrArg)(this.currentCommand, 0);
        return types_1.COMMAND_TYPE_MAP[command].type;
    }
    arg1() {
        const command = (0, util_1.getCommandOrArg)(this.currentCommand, 0);
        const isArg1 = types_1.COMMAND_TYPE_MAP[command].arg1;
        const arg1 = (0, util_1.getCommandOrArg)(this.currentCommand, 1);
        if (isArg1 === "self")
            return command;
        if (!!isArg1)
            return arg1;
    }
    arg2() {
        const command = (0, util_1.getCommandOrArg)(this.currentCommand, 0);
        const isArg2 = types_1.COMMAND_TYPE_MAP[command].arg2;
        const arg2 = parseInt((0, util_1.getCommandOrArg)(this.currentCommand, 2));
        if (isArg2)
            return arg2;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map