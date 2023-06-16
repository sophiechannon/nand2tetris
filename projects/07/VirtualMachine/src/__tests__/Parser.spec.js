"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("../classes/Parser");
describe("Parser", () => {
    it("advances and returns commandType", () => {
        const parser = new Parser_1.Parser("src/__tests__/CommandTypes.vm");
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
        const parser = new Parser_1.Parser("src/__tests__/CommandTypes.vm");
        parser.advance();
        expect(parser.arg1()).toBe("add");
        parser.advance();
        expect(parser.arg1()).toBe("sub");
        parser.advance();
        expect(parser.arg1()).toBe("constant");
        parser.advance();
        expect(parser.arg1()).toBe("end");
        parser.advance();
        expect(parser.arg1()).toBe("");
    });
    it("returns correct second arg", () => {
        const parser = new Parser_1.Parser("src/__tests__/CommandTypes.vm");
        parser.advance();
        expect(parser.arg2()).toBe(undefined);
        parser.advance();
        expect(parser.arg2()).toBe(undefined);
        parser.advance();
        expect(parser.arg2()).toBe(7);
        parser.advance();
        expect(parser.arg2()).toBe(undefined);
        parser.advance();
        expect(parser.arg2()).toBe(undefined);
    });
});
//# sourceMappingURL=Parser.spec.js.map