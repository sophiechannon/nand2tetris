require './lib/code.rb'
require './lib/parser.rb'
require './lib/symbol_table.rb'

parser = Parser.new('../pong/Pong.asm')
code = Code.new
symbol_table = SymbolTable.new

class Assembler
  def initialize(parser, code, symbol_table)
    @parser = parser
    @code = code
    @symbol_table = symbol_table
    @counter = 0
    @var_counter = 16
  end

  def assemble
    first_pass
    second_pass
  end

  private

  def first_pass
    while @parser.has_more_commands
      @parser.advance
      if @parser.command_type != "L_COMMAND"
        @counter += 1
      else
        handle_l_command
      end
    end
  end

  def second_pass
    @parser.counter = 0
    while @parser.has_more_commands
      command = ""
      write = @parser.counter == 0 ? "w" : "a"
      @parser.advance
      if @parser.command_type == "A_COMMAND"
        write_to_file(assemble_a_command, write)
      elsif @parser.command_type == "C_COMMAND"
        write_to_file(assemble_c_command, write)
      end
    end
  end

  def write_to_file(string, write)
    File.write(@parser.file_dir + "/" + get_file_name, string + "\n", mode: write)
  end

  def get_file_name
    @parser.file_name + ".hack"
  end

  def handle_l_command
    l_command = @parser.current_command[1..-2]
    if !@symbol_table.contains(l_command)
      @symbol_table.add_entry(l_command, @counter)
    end
  end

  def assemble_a_command
    binary = ""
    if not_symbol?
       binary = @parser.symbol.to_i.to_s(2)
    elsif @symbol_table.contains(@parser.symbol)
      binary = @symbol_table.get_address(@parser.symbol).to_s(2)
    else 
      @symbol_table.add_entry(@parser.symbol, @var_counter)
      binary = @var_counter.to_s(2)
      @var_counter += 1
    end
    remaining_zeros = 16 - binary.length
    "0" * remaining_zeros + binary
  end

  def assemble_c_command
    "111" + @code.comp(@parser.comp) + @code.dest(@parser.dest) + @code.jump(@parser.jump)
  end

  def not_symbol?
    @parser.symbol.scan(/\D/).empty?
  end
end

assembler = Assembler.new(parser, code, symbol_table)
assembler.assemble