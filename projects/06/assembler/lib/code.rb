class Code
  DEST = {
    M: "001",
    D: "010",
    MD: "011",
    A: "100",
    AM: "101",
    AD: "110",
    AMD: "111"
  }

  JUMP = {
    JGT: "001",
    JEQ: "010",
    JGE: "011",
    JLT: "100",
    JNE: "101",
    JLE: "110",
    JMP: "111"
  }

  COMP = {
    "0" => "101010",
    "1" => "111111",
    "-1" => "111010",
    "D" => "001100",
    "A" => "110000",
    "!D" => "001101",
    "!A" => "110001",
    "-D" => "001111",
    "-A" => "110011",
    "D+1" => "011111",
    "A+1" => "110111",
    "D-1" => "001110",
    "A-1" => "110010",
    "D+A" => "000010",
    "D-A" => "010011",
    "A-D" => "000111",
    "D&A" => "000000",
    "D|A" => "010101"
  }

  def dest(mnemonic)
    if mnemonic == nil || mnemonic == "null"
      return "000"
    else
      return DEST[mnemonic.to_sym]
    end
  end

  def jump(mnemonic)
    if mnemonic == nil || mnemonic == "null"
      return "000"
    else
      return JUMP[mnemonic.to_sym]
    end
  end

  def comp(mnemonic)
    contains_m = mnemonic.include?("M")
    mnemonic_just_a = mnemonic.gsub("M", "A")
    "#{contains_m ? "1" : "0"}#{COMP[mnemonic_just_a]}"
  end
end