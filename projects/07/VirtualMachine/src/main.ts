import process from "process";
import { Parser } from "./classes/Parser";
import { CodeWriter } from "./classes/CodeWriter";

export const runProgram = () => {
  const p = new Parser(process.argv[2]);
  console.log(p.getFile());
};

runProgram();
