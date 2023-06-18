import * as fs from "fs";
import { getCommandOrArg } from "../utils/util.js";
import { COMMAND_TYPE_MAP } from "../types/types.js";
export class Parser {
    constructor(filePath) {
        const openFile = fs.readFileSync(filePath, "utf8");
        this.file = openFile.split("\n");
        this.counter = 0;
        this.currentCommand = "";
    }
    hasMoreCommands() {
        return this.counter < this.file.length;
    }
    advance() {
        this.currentCommand = this.file[this.counter];
        this.counter++;
    }
    commandType() {
        var _a;
        const command = getCommandOrArg(this.currentCommand, 0);
        return (_a = COMMAND_TYPE_MAP[command]) === null || _a === void 0 ? void 0 : _a.type;
    }
    arg1() {
        const command = getCommandOrArg(this.currentCommand, 0);
        const isArg1 = COMMAND_TYPE_MAP[command].arg1;
        const arg1 = getCommandOrArg(this.currentCommand, 1);
        if (isArg1 === "self")
            return command;
        if (!!isArg1)
            return arg1;
        return "";
    }
    arg2() {
        const command = getCommandOrArg(this.currentCommand, 0);
        const isArg2 = COMMAND_TYPE_MAP[command].arg2;
        const arg2 = parseInt(getCommandOrArg(this.currentCommand, 2));
        if (isArg2)
            return arg2;
    }
}
//# sourceMappingURL=Parser.js.map