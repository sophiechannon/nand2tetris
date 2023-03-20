require 'parser'

describe Parser do
  it "returns 0 for counter initially" do
    parser = Parser.new("../add/Add.asm")
    expect(parser.counter).to eq 0
  end
  it "returns empty string for current initially" do
    parser = Parser.new("../add/Add.asm")
    expect(parser.current_command).to eq ""
  end
  it "returns empty string for current initially" do
    parser = Parser.new("../add/Add.asm")
    expect(parser.current_command).to eq ""
  end
  it "advances by one and ignores comments" do
    parser = Parser.new("../add/Add.asm")
    parser.advance
    expect(parser.counter).to eq 1
    expect(parser.current_command).not_to eq "// This file is part of www.nand2tetris.org"
    expect(parser.symbol).to eq "2"
    expect(parser.comp).to eq nil
    expect(parser.dest).to eq nil
    expect(parser.jump).to eq nil
  end
  it "advances by two and displays comp dest" do
    parser = Parser.new("../add/Add.asm")
    parser.advance
    parser.advance
    expect(parser.counter).to eq 1
    expect(parser.current_command).not_to eq "// This file is part of www.nand2tetris.org"
    expect(parser.symbol).to eq nil
    expect(parser.comp).to eq "A"
    expect(parser.dest).to eq "D"
    expect(parser.jump).to eq nil
  end
end