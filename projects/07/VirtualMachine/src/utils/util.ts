export const getCommandOrArg = (line: string, index: number) =>
  line?.split(" ")[index];

export const incrementSP = `@SP\n` + `M=M+1\n`; // // Memory[SP] = Memory[SP] + 1

export const popFromTop =
  `@SP\n` + // set A register value of SP
  `M=M-1\n` + // Memory[SP] = Memory[SP] - 1
  `A=M\n`; // A = Memory[SP]

export const initialCode = `@256\nD=A\n@SP\nM=D\n`;
