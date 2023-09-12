package jackcompiler

import java.io.File
import java.util.Scanner


class JackTokenizer(private val inputStream: String) {
     var currentToken: String = ""
    private var charCounter = 0;
    private val scanner = Scanner(File(inputStream))
    var currentLine: String = scanner.nextLine().trim()
    private var isWritingString = false
    private var isWritingInteger = false
    private val outputT = File(inputStream.replace(".jack", "TokenTest.xml"))
    var tokenType: String = ""

    init {
        outputT.writeText("<tokens>\n")
    }

    private val keywords = arrayOf(
        "class", "constructor", "function",
        "method", "field", "static", "var",
        "int", "char", "boolean", "void", "true",
        "false", "null", "this", "let", "do",
        "if", "else", "while", "return"
    )
    private val symbols = arrayOf(
        '{', '}', '(', ')', '[', ']', '.',
        ',', ';', '+', '-', '*', '/', '&',
        '|', '<', '>', '=', '~'
    )

    private val tokenTypes = mapOf(
        "KEYWORD" to "keyword", "SYMBOL" to "symbol", "IDENTIFIER" to "identifier", "STRING_CONST" to "stringConstant", "INT_CONST" to "integerConstant"
    )

    private val comments = arrayOf("//", "/**", "/*", "*")

    fun hasMoreTokens(): Boolean {
        var hasMore = moreTokens()
        if (!hasMore) { finishWriting() }
        return hasMore
    }

    fun advance() {
        var newTokenType = "IDENTIFIER"
        var newToken = ""
        handleNewLine()
        skipCommentsAndEmptyLines()

        tokens@ while (!isKeywordOrSymbol(newToken)) {
            if (!moreTokens()) {
                return
            }

            skipSpaces(newToken)

            if (isInlineComment(newToken)) {
                newToken = ""
                advanceAndReset()
            }

            if (isString(newToken)) {
                newToken = handleStringConstants(newToken)
                newTokenType = "STRING_CONST"
                break@tokens
            }

            if (isInteger(currentLine[charCounter])) {
                newToken = handleIntegerConstants()
                newTokenType = "INT_CONST"
            }

            if (isConjoinedIdentifierAndSymbol(newToken)) {
                charCounter++
                break@tokens
            }

            if (isIndentifier(newToken)) {
                break@tokens
            }

            newToken = newToken.plus(currentLine[charCounter].toString())
            charCounter++
        }
        setCurrentTokenAndType(newToken, newTokenType)
        write()
    }

    fun keyword(): String? {
        return if (tokenType == "KEYWORD") {
            currentToken.uppercase()
        } else {
            null
        }
    }

    fun symbol(): Char? {
        return if (tokenType == "SYMBOL") {
            currentToken[0]
        } else null
    }

    fun identifier(): String? {
        return if (tokenType == "IDENTIFIER") {
            currentToken
        } else null
    }

    fun intVal(): Int? {
        return if (tokenType == "INT_CONST") {
            currentToken.toInt()
        } else null
    }

    fun stringVal(): String? {
        return if (tokenType == "STRING_CONST") {
            currentToken.substring(1, currentToken.length - 1)
        } else null
    }

    fun getStringToWrite(): String {
        return "<${tokenTypes[tokenType]}> ${
            keyword()?.lowercase()
                ?: handleXmlChars(symbol())
                ?: identifier()
                ?: intVal()
                ?: handleXmlStrings(stringVal())
        } </${tokenTypes[tokenType]}>\n"
    }

    // private methods

    private fun write() {
        var string = getStringToWrite()
        outputT.appendText(string)
    }

    private fun finishWriting() {
        outputT.appendText(("</tokens>"))
    }

    private fun handleNewLine() {
        if (currentLine.length == charCounter) {
            advanceAndReset()
        }
    }

    private fun isSymbol(string: String): Boolean {
        if (string.isNullOrEmpty()) {
            return false
        };
        return symbols.joinToString().contains(string)
    }

    private fun isKeywordOrSymbol(string: String): Boolean {
        if (string.isNullOrEmpty() || isInlineComment(string)) {
            return false
        };

        return keywords.contains(string) ||
                isSymbol(string)
    }

    private fun isInlineComment(string: String): Boolean {
        if (string == "/") {
            if (charCounter < currentLine.length - 1) {
                return currentLine.substring(charCounter -1, charCounter + 1) == "//"
            }
        }
        return false
    }

    private fun startsWithComment(string: String): Boolean {
        var included = false
        for (comment: String in comments) {
            if (string.trim().startsWith(comment)) {
                included = true
                break
            }
        }
        return included
    }

    private fun advanceLine() {
        currentLine = scanner.nextLine().trim()
        return
    }

    private fun handleStringConstants(token: String): String {
        var newToken = token
        isWritingString = true
        while (isWritingString) {
            newToken = newToken.plus(currentLine[charCounter])
            charCounter++
            if (isString(newToken[newToken.length - 1].toString())) {
                isWritingString = false
            }
        }
        return newToken
    }

    private fun handleIntegerConstants(): String {
        var newToken = ""
        isWritingInteger = true
        while (isWritingInteger) {
            if (!isInteger(currentLine[charCounter])) {
                isWritingInteger = false
                break
            }
            newToken = newToken.plus(currentLine[charCounter])
            charCounter++
            }
        return newToken
    }

    private fun isConjoinedIdentifierAndSymbol(token: String): Boolean {
        return token.isNotEmpty() && isSpace(currentLine[charCounter])
    }

    private fun skipCommentsAndEmptyLines() {
        comments@ while (startsWithComment(currentLine)
            || removeWhitespace(currentLine).isEmpty()) {
            if (scanner.hasNextLine()) {
                advanceLine()

            }
            else break@comments
        }
    }

    private fun skipSpaces(token: String) {
        while (token.isNullOrEmpty()
                && isSpace(currentLine[charCounter])) {
                charCounter++
            }
    }

    private fun isIndentifier(token: String): Boolean {
        return token.isNotEmpty()
                && isSymbol(currentLine[charCounter].toString())
    }

    private fun setCurrentTokenAndType(token: String, newTokenType: String) {
        if (removeWhitespace(token).isNotEmpty()) {
            tokenType = if (isSymbol(token)) {
                "SYMBOL"
            } else if (isKeywordOrSymbol(token)) {
                "KEYWORD"
            } else {
                newTokenType
            }
            currentToken = token
        }
    }

    private fun advanceAndReset() {
        advanceLine()
        skipCommentsAndEmptyLines()
        charCounter = 0
    }

    private fun handleXmlChars(char: Char?): String? {
        if (char == null) return null
        return when (char) {
            '<' -> {
                "&lt;"
            }
            '>' -> {
                "&gt;"
            }
            '&' -> {
                "&amp;"
            }
            '"' -> {
                "&quot;"
            }
            else -> {
                char.toString()
            }
        }
    }

    private fun handleXmlStrings(string: String?): String? {
        if (string == null) return null
        return string.
            replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("&", "&amp;")
            .replace("\"", "&quot;")
    }

    private fun moreTokens(): Boolean {
        return scanner.hasNextLine() || currentLine.length > charCounter
    }
}
