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
});
