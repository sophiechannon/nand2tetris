import process from "process";
import { Parser } from "./Parser.js";

export const runProgram = () => {
  const p = new Parser(process.argv[2]);
  console.log(p.getFile());
};

runProgram();
