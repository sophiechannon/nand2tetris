class Parser
  attr_accessor :counter
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
    res = @stream[@counter]
    @current_command = ignore_comments(res)
    @counter += 1
  end

  def command_type
    if (has_dest || @current_command.include?(";"))
      "C_COMMAND"
    elsif @current_command.start_with?("(")
      "L_COMMAND"
    elsif @current_command.start_with?("@")
      "A_COMMAND" 
    end
  end

  def symbol
    if command_type == "A_COMMAND"
      res = @current_command.sub("@R", "").sub("@", "")
      ignore_comments(res)
    end
  end

  def dest
    if c_and_dest
      @current_command.split("=")[0].strip
    end
  end

  def comp
    if c_and_dest
      res = @current_command.split("=")[1]
      ignore_comments(res)
    elsif command_type == "C_COMMAND" && !has_dest()
      @current_command.split(";")[0].strip
    end
  end

  def jump 
    if command_type == "C_COMMAND" && !has_dest()
      res = @current_command.split(";")[1]
      ignore_comments(res)
    end
  end

  private

  def c_and_dest
    command_type == "C_COMMAND" && has_dest
  end

  def has_dest
    @current_command.include?("=")
  end

  def ignore_comments(string)
    string.split("//")[0].strip
  end
end
