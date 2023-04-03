import Parser from "../Parser";

describe("Parser", () => {
  it("getsFile", () => {
    const parser = new Parser("src/__tests__/Sample.vm");
    expect(parser.getFile()).toEqual(["first line", "second line"]);
  });
});
