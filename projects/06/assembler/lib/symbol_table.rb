class SymbolTable
  def initialize
    @symbol_hash = Hash.new
  end

  def add_entry(symbol, address)
    @symbol_hash[symbol] = address
  end

  def contains(symbol)
    !!@symbol_hash[symbol]
  end

  def get_address(symbol)
    @symbol_hash[symbol]
  end
end