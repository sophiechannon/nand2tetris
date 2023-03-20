class Parser
  attr_reader :counter
  attr_reader :current_command

  def initialize(stream)
    file = File.open(stream)
    @stream = file.readlines
      .map(&:chomp)
      .filter! {|line| !line.start_with?("//") && line != ""}
    @counter = 0
    @current_command = ""
  end

  def hasMoreCommands
    # boolean
    # Are there more commands in the input
    @count < @stream.length - 1
  end

  def advance
    @current_command = @stream[@counter]
    @counter =+ 1
  end

  def commandType
    if @current_command.start_with?("@")
      "A_COMMAND"
    elsif has_dest || @current_command.include?(";")
      "C_COMMAND" 
    else
      "L_COMMAND"
    end
  end

  def symbol
    if commandType != "C_COMMAND"
      return @current_command.sub("@", "")
    end
  end

  def dest
    if c_and_dest
      return @current_command.split("=")[0]
    end
  end

  def comp
    if c_and_dest
      @current_command.split("=")[1]
    elsif commandType == "C_COMMAND" && !has_dest()
      @current_command.split(":")[0]
    end
  end

  def jump 
    if commandType == "C_COMMAND" && !has_dest()
      @current_command.split(":")[1]
    end
  end

  private

  def c_and_dest
    commandType == "C_COMMAND" && has_dest
  end

  def has_dest
    @current_command.include?("=")
  end
end

parser = Parser.new('../add/Add.asm')
p parser.counter
p parser.current_command
parser.advance
p parser.symbol
parser.advance
p parser.comp
p parser.dest
p parser.jump
