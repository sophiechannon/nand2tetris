import * as fs from "fs";

const arithmetic = ["add", "sub", "neg", "eq", "gt", "lt", "and", "or", "not"];
const arg_2_valid = ["C_RETURN", "C_CALL", "C_POP", "C_PUSH"];

const getCommandOrArg = (line: string, index: number) =>
  line?.split(" ")[index];

export default class Parser {
  file: string[];
  counter: number;
  currentCommand: string;

  constructor(filePath: string) {
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
    if (arithmetic.includes(command)) return "C_ARITHMETIC";
    if (command === "if-goto") return "C_IF";
    return `C_${command?.toUpperCase()}`;
  }

  arg1() {
    const command = getCommandOrArg(this.currentCommand, 0);
    if (command === "return") return;
    if (arithmetic.includes(command)) {
      return command;
    }

    return getCommandOrArg(this.currentCommand, 1);
  }

  arg2() {
    const arg = getCommandOrArg(this.currentCommand, 2);
    if (arg_2_valid.includes(this.commandType())) return arg;
  }
}
