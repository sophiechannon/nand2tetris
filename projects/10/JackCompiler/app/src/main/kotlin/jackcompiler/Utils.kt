package jackcompiler

fun removeWhitespace(string: String): String {
    return string.replace("\\s".toRegex(), "")
}

fun isSpace(string: Char): Boolean {
    return string == ' '
}

fun isString(string: String): Boolean {
    return string == "\""
}

fun isInteger(string: Char): Boolean {
    return string.code in 48..57
}