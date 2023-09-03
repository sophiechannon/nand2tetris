package jackcompiler

import java.io.File
import java.util.Scanner


class JackTokenizer(private val inputStream: String) {
    private var currentToken: String = ""
    private var charCounter = 0;
    private val scanner = Scanner(File(inputStream))
    private var currentLine: String = scanner.nextLine()
    private var isWritingString = false
    private var isWritingInteger = false
    var tokenType: String = ""

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

    private val comments = arrayOf("//", "/**", "/*")

    fun hasMoreTokens(): Boolean {
        return scanner.hasNextLine() || currentLine.length > charCounter
    }

    fun advance() {
        var newTokenType = "IDENTIFIER"
        var newToken = ""
        handleNewLine()

        tokens@ while (!isKeywordOrSymbol(newToken)) {
            skipCommentsAndEmptyLines()
            skipSpaces(newToken)

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
        return
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

    private fun handleNewLine() {
        if (currentLine.length == charCounter) {
            advanceLine()
            charCounter = 0
        }
    }

    private fun isSymbol(string: String): Boolean {
        if (string.isNullOrEmpty()) {
            return false
        };
        return symbols.joinToString().contains(string)
    }

    private fun isKeywordOrSymbol(string: String): Boolean {
        if (string.isNullOrEmpty()) {
            return false
        };
        return keywords.contains(string) ||
                isSymbol(string)
    }

    private fun lineStartsWithComment(string: String): Boolean {
        var included = false
        for (comment: String in comments) {
            if (string.startsWith(comment)) {
                included = true
                break
            }
        }
        return included
    }

    private fun advanceLine() {
        currentLine = scanner.nextLine().trim()
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
        while (lineStartsWithComment(currentLine) || removeWhitespace(currentLine).isNullOrEmpty()) {
            advanceLine()
        }
    }

    private fun skipSpaces(token: String) {
        while (token.isNullOrEmpty() && isSpace(currentLine[charCounter])) {
            charCounter++
        }
    }

    private fun isIndentifier(token: String): Boolean {
        return token.isNotEmpty() && isSymbol(currentLine[charCounter].toString())
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
}
