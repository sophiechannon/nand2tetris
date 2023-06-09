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

export type ac = typeof ARITHMETIC_COMMANDS;

export const ARITHMETIC_COMMANDS = {
  add: "+",
  sub: "-",
  and: "&",
  or: "|",
  not: "!",
};

export const getCommandOrArg = (line: string, index: number) =>
  line?.split(" ")[index];

export const twoPartArithmetic = (command: string) => {
  `M=M-1\n` + // (Memory[4] = Memory[4] - 1 (i.e. 99))
    `A=M\n` + // (A = Memory[99] e.g. 50)
    `D=M\n` + // (D = Memory[99] e.g. 50)
    `@SP\n` + // (99)
    `M=M-1\n` + // (Memory[4] = Memory[4] - 1 (i.e. 98))
    `A=M\n` + // (A = Memory[98] e.g. 60)
    `M=M${ARITHMETIC_COMMANDS[command as keyof ac]}D\n` + // (M = Memory[98] 60 + 50)
    `@SP\n` + // Memory[4] 98
    `M=M+1\n`; // @SP = 99
};
