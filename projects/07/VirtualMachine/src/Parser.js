import * as fs from "fs";
import { getCommandOrArg, COMMAND_TYPE_MAP } from "./util.js";
export class Parser {
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
        const command = getCommandOrArg(this.currentCommand, 0);
        return COMMAND_TYPE_MAP[command].type;
    }
    arg1() {
        const command = getCommandOrArg(this.currentCommand, 0);
        const isArg1 = COMMAND_TYPE_MAP[command].arg1;
        const arg1 = getCommandOrArg(this.currentCommand, 1);
        if (isArg1 === "self")
            return command;
        if (!!isArg1)
            return arg1;
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