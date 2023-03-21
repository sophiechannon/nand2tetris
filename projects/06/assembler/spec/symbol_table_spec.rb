require "symbol_table"

describe SymbolTable do
  it "saves to and retrieves from table" do
    table = SymbolTable.new
    table.add_entry("sum", 1024)
    expect(table.contains("sum")).to eq true
    expect(table.contains("bum")).to eq false
    res = table.get_address("sum")
    expect(res).to eq 1024
  end
end