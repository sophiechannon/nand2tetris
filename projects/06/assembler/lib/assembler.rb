require './lib/code.rb'
require './lib/parser.rb'

parser = Parser.new('../max/Max.asm')
code = Code.new

class Assembler
  def initialize(parser, code)
    @parser = parser
    @code = code
  end

  def assemble
    while @parser.has_more_commands
      command = ""
      write = @parser.counter == 0 ? "w" : "a"
      @parser.advance
      if @parser.command_type == "A_COMMAND"
        puts "A"
        command = assemble_a_command
      elsif @parser.command_type == "C_COMMAND"
        puts "C"
        command = assemble_c_command
      end
      write_to_file(command, write)
    end
  end

  private

  def write_to_file(string, write)
    File.write(@parser.file_dir + "/" + get_file_name, string + "\n", mode: write)
  end

  def get_file_name
    @parser.file_name + ".hack"
  end

  def assemble_a_command
    res = @parser.symbol.sub("@", "").to_i.to_s(2)
    remaining_zeros = 16 - res.length
    res = "0" * remaining_zeros + res
    res
  end

  def assemble_c_command
    res = "111" + @code.comp(@parser.comp) + @code.dest(@parser.dest) + @code.jump(@parser.jump)
    res
  end
end

# assembler = Assembler.new(parser, code)
# assembler.assemble