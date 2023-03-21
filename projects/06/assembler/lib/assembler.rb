require './lib/code.rb'
require './lib/parser.rb'

parser = Parser.new('./Prog.asm')
code = Code.new

class Assembler
  def initialize(parser, code)
    @parser = parser
    @code = code
  end

  def assemble
    @parser.advance
    if @parser.command_type == "A_COMMAND"
      puts @parser.symbol
      res = @parser.symbol.to_i.to_s(2)
      p res
      write_to_file(res)
    end
  end

  def write_to_file(string)
    File.write(@parser.file_dir + "/" + get_file_name, string + "\n")
  end

  def get_file_name
    @parser.file_name + ".hack"
  end
end

assembler = Assembler.new(parser, code)
assembler.assemble