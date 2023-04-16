import * as fs from "fs";

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
    const arithmetic = [
      "add",
      "sub",
      "neg",
      "eq",
      "gt",
      "lt",
      "and",
      "or",
      "not",
    ];
    if (arithmetic.includes(command)) return "C_ARITHMETIC";
    if (command === "if-goto") return "C_IF";
    return `C_${command?.toUpperCase()}`;
  }

  arg1() {
    if (this.commandType() === "C_RETURN") return;
    if (this.commandType() === "C_ARITHMETIC")
      return getCommandOrArg(this.currentCommand, 0);

    return getCommandOrArg(this.currentCommand, 1);
  }
}

const getCommandOrArg = (line: string, index: number) =>
  line?.split(" ")[index];
