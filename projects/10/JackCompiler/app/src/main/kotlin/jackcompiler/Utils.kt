package jackcompiler

fun removeWhitespace(string: String): String {
    return string.replace("\\s".toRegex(), "")
}

fun isSpace(string: Char): Boolean {
    return string == ' '
}

fun isSymbol(string: String, symbols: Array<Char>): Boolean {
    if (string.isNullOrEmpty()) {
        return false
    };
    return symbols.joinToString().contains(string)
}

fun isString(string: String): Boolean {
    return string == "\""
}

fun isInteger(string: Char): Boolean {
    return string.code in 48..57
}