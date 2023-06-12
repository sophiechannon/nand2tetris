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
  neg: "-",
};

export const getCommandOrArg = (line: string, index: number) =>
  line?.split(" ")[index];

const prepareForBinary =
  `@SP\n` + // set A register to contents of SP (100)
  `M=M-1\n` + // (Memory[4] = Memory[4] - 1 (i.e. 99))
  `A=M\n` + // (A = 99)
  `D=M\n` + // (D = Memory[99] e.g. 50)
  `@SP\n` + // (99)
  `M=M-1\n` + // (Memory[4] = Memory[4] - 1 (i.e. 98))
  `A=M\n`; // (A = 98)

export const unaryOperation = (op: string) =>
  `@SP\n` + // 100
  `M=M-1\n` + // SP = SP - 1 (i.e. 99))
  `A=M\n` + // (A = 99)
  `M=${ARITHMETIC_COMMANDS[op as keyof ac]}M\n` + // Memory[99] = - Memory[99] e.g. - 50
  `@SP\n` + // 99
  `M=M+1\n`; // SP = 100

export const binaryOperation = (op: string) =>
  prepareForBinary +
  `M=M${ARITHMETIC_COMMANDS[op as keyof ac]}D\n` + // (M = Memory[98] 60 + 50)
  `@SP\n` + // Memory[4] 98
  `M=M+1\n`; // @SP = 99

export const compareOperation = (op: string) =>
  prepareForBinary + // D is set to value of top of stack, a is set to address of next down
  `D=M-D` + // minus the 2nd from top of stack from top of stack
  `@TRUE` + // set a to @TRUE
  `D;J${op.toUpperCase()}`; // if D < = > 0 jump to true
// what happens if not
//

export const push = () => {};

// @SP
// A=M
// M=x
// @SP
// M=M+1
