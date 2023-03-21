require 'code'

describe Code do
  it "returns dest as binary" do
    code = Code.new
    expect(code.dest("null")).to eq "000"
    expect(code.dest("M")).to eq "001"
    expect(code.dest("AMD")).to eq "111"
  end
  it "returns jump as binary" do
    code = Code.new
    expect(code.jump("null")).to eq "000"
    expect(code.jump("JGT")).to eq "001"
    expect(code.jump("JMP")).to eq "111"
  end
  it "returns comp as binary" do
    code = Code.new
    expect(code.comp("0")).to eq "0101010"
    expect(code.comp("A")).to eq "0110000"
    expect(code.comp("M")).to eq "1110000"
    expect(code.comp("D&A")).to eq "0000000"
    expect(code.comp("M+1")).to eq "1110111"
  end
end