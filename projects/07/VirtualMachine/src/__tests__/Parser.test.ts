import Parser from "../Parser";

describe("Parser", () => {
  it("getsFile", () => {
    const parser = new Parser("src/__tests__/Sample.vm");
    expect(parser.getFile()).toEqual(["first line", "second line"]);
  });
  it("advances and returns commandType", () => {
    const parser = new Parser("src/__tests__/CommandTypes.vm");
    parser.advance();
    expect(parser.commandType()).toEqual("C_ARITHMETIC");
    parser.advance();
    expect(parser.commandType()).toEqual("C_ARITHMETIC");
    parser.advance();
    expect(parser.commandType()).toEqual("C_PUSH");
    parser.advance();
    expect(parser.commandType()).toEqual("C_IF");
    parser.advance();
    expect(parser.commandType()).toEqual("C_RETURN");
  });
  it("returns correct first arg", () => {
    const parser = new Parser("src/__tests__/CommandTypes.vm");
    parser.advance();
    expect(parser.arg1()).toBe("add");
    parser.advance();
    expect(parser.arg1()).toBe("sub");
    parser.advance();
    expect(parser.arg1()).toBe("constant");
    parser.advance();
    expect(parser.arg1()).toBe("end");
    parser.advance();
    expect(parser.arg1()).toBe(undefined);
  });
  it("returns correct second arg", () => {
    const parser = new Parser("src/__tests__/CommandTypes.vm");
    parser.advance();
    expect(parser.arg2()).toBe(undefined);
    parser.advance();
    expect(parser.arg2()).toBe(undefined);
    parser.advance();
    expect(parser.arg2()).toBe("7");
    parser.advance();
    expect(parser.arg2()).toBe(undefined);
    parser.advance();
    expect(parser.arg2()).toBe(undefined);
  });
});
