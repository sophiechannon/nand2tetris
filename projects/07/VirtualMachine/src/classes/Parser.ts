import * as fs from "fs";
import { getCommandOrArg } from "../utils/util";
import { COMMAND_TYPE_MAP, Ctm } from "../types/types";

export class Parser {
  file: string[];
  counter: number;
  currentCommand: string;

  constructor(filePath: string) {
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

  commandType(): string {
    const command = getCommandOrArg(this.currentCommand, 0);
    return COMMAND_TYPE_MAP[command as keyof Ctm]?.type;
  }

  arg1() {
    const command = getCommandOrArg(this.currentCommand, 0);
    const isArg1 = COMMAND_TYPE_MAP[command as keyof Ctm].arg1;
    const arg1 = getCommandOrArg(this.currentCommand, 1);
    if (isArg1 === "self") return command;
    if (!!isArg1) return arg1;
    return "";
  }

  arg2() {
    const command = getCommandOrArg(this.currentCommand, 0);
    const isArg2 = COMMAND_TYPE_MAP[command as keyof Ctm].arg2;
    const arg2 = parseInt(getCommandOrArg(this.currentCommand, 2));
    if (isArg2) return arg2;
  }
}
