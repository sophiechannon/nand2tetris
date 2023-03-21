class Parser
  attr_reader :counter
  attr_reader :current_command
  attr_reader :file_name
  attr_reader :file_dir

  def initialize(stream)
    file = File.open(stream)
    @file_name = File.basename(stream, ".*") 
    @file_dir = File.dirname(stream)
    @stream = file.readlines
      .map(&:chomp)
      .filter! {|line| !line.start_with?("//") && line != ""}
    @counter = 0
    @current_command = ""
  end

  def has_more_commands
    @counter < @stream.length
  end

  def advance
    @current_command = @stream[@counter]
    @counter += 1
  end

  def command_type
    if (has_dest || @current_command.include?(";"))
      "C_COMMAND"
    elsif @current_command.start_with?("(")
      "L_COMMAND"
    else
      "A_COMMAND" 
    end
  end

  def symbol
    if command_type != "C_COMMAND"
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
    elsif command_type == "C_COMMAND" && !has_dest()
      @current_command.split(":")[0]
    end
  end

  def jump 
    if command_type == "C_COMMAND" && !has_dest()
      @current_command.split(":")[1]
    end
  end

  private

  def c_and_dest
    command_type == "C_COMMAND" && has_dest
  end

  def has_dest
    @current_command.include?("=")
  end
end
