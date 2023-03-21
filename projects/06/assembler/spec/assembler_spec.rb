require 'code'
require 'parser'
require 'assembler'

describe Assembler do
  it "returns filename with new extension" do
    code = Code.new
    parser = Parser.new("./Prog.asm")
    assembler = Assembler.new(parser, code)
    expect(assembler.get_file_name).to eq "Prog.hack"
  end
end