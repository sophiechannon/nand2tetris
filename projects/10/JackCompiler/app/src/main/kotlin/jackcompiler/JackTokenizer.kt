package jackcompiler

import java.io.File
import java.util.Scanner


class JackTokenizer(private val inputStream: String) {
    private var currentToken = ""
    var charCounter = 0;
    private val scanner = Scanner(File(inputStream))
    var currentLine: String = scanner.nextLine()
    private var isWritingString = false
    private var isWritingInteger = false

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
        var newToken = ""
        if (currentLine.length == charCounter) {
            advanceLineAndClean()
            charCounter = 0
        }
        tokens@ while (!isKeywordOrSymbol(newToken)) {
            skipCommentsAndEmptyLines()
            skipSpaces(newToken)

            if (isString(newToken)) {
                newToken = handleStringConstants(newToken)
                break@tokens
            }

            if (isInteger(currentLine[charCounter])) {
                newToken = handleIntegerConstants()
            }
            if (isConjoinedKeywordAndSymbol(newToken)) {
                charCounter++
                break@tokens
            }
            if (isIndentifier(newToken)) {
                break@tokens
            }

            newToken = newToken.plus(currentLine[charCounter].toString())
            charCounter++

        }
        setCurrentToken(newToken)
        println(currentToken)
        return
    }

    private fun isKeywordOrSymbol(string: String): Boolean {
        if (string.isNullOrEmpty()) {
            return false
        };
        return keywords.contains(string) ||
                isSymbol(string, symbols)
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

    private fun advanceLineAndClean() {
        currentLine = scanner.nextLine().trim()
    }

    private fun handleStringConstants(token: String): String {
        var newToken = token
        isWritingString = true
        string@ while (isWritingString) {
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

    private fun isConjoinedKeywordAndSymbol(token: String): Boolean {
        return token.isNotEmpty() && isSpace(currentLine[charCounter])
    }

    private fun skipCommentsAndEmptyLines() {
        while (lineStartsWithComment(currentLine) || removeWhitespace(currentLine).isNullOrEmpty()) {
            advanceLineAndClean()
        }
    }

    private fun skipSpaces(token: String) {
        while (token.isNullOrEmpty() && isSpace(currentLine[charCounter])) {
            charCounter++
        }
    }

    private fun isIndentifier(token: String): Boolean {
        return token.isNotEmpty() && isSymbol(currentLine[charCounter].toString(), symbols)
    }

    private fun setCurrentToken(token: String) {
        if (removeWhitespace(token).isNotEmpty()) {
            currentToken = token
        }
    }
}
