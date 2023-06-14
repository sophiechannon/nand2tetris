export type Ctm = typeof COMMAND_TYPE_MAP;

export const COMMAND_TYPE_MAP = {
  add: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
  sub: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
  neg: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
  eq: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
  gt: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
  lt: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
  and: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
  or: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
  not: { type: "C_ARITHMETIC", arg1: "self", arg2: false },
  pop: { type: "C_POP", arg1: true, arg2: true },
  push: { type: "C_PUSH", arg1: true, arg2: true },
  label: { type: "C_LABEL", arg1: true, arg2: false },
  goto: { type: "C_GOTO", arg1: true, arg2: false },
  "if-goto": { type: "C_IF", arg1: true, arg2: false },
  function: { type: "C_FUNCTION", arg1: true, arg2: true },
  return: { type: "C_RETURN", arg1: false, arg2: false },
  call: { type: "C_CALL", arg1: true, arg2: true },
};

export const SEGMENT_MAP = {
  argument: "ARG",
  local: "LCL",
  static: "",
  constant: "",
  this: "THIS",
  that: "THAT",
  pointer: "SP",
  temp: "TMP",
};

export type AC = typeof ARITHMETIC_COMMANDS;

export const ARITHMETIC_COMMANDS = {
  add: "+",
  sub: "-",
  and: "&",
  or: "|",
  not: "!",
  neg: "-",
};

export const getCommandOrArg = (line: string, index: number) =>
  line?.split(" ")[index];

export const incrementSP = `@SP\n` + `M=M+1\n`; // // Memory[SP] = Memory[SP] + 1

export const popFromTop =
  `@SP\n` + // set A register value of SP
  `M=M-1\n` + // Memory[SP] = Memory[SP] - 1
  `A=M\n`; // A = Memory[SP]
