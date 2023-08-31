package jackcompiler

import java.io.File
import java.util.Scanner


class JackTokenizer(private val inputStream: String) {
    private var currentToken = ""
    var charCounter = 0;
    private val scanner = Scanner(File(inputStream))
    var currentLine: String = scanner.nextLine()
    var isWritingString = false

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
            comments@ while (lineStartsWithComment(currentLine) || removeWhitespace(currentLine) .isNullOrEmpty()) {
                advanceLineAndClean()
            }

            empty@ while (newToken.isNullOrEmpty() && isSpace(currentLine[charCounter])) {
                charCounter++
            }

            if (isString(newToken)) {
                isWritingString = true
                    string@ while (isWritingString) {
                        newToken = newToken.plus(currentLine[charCounter])
                        charCounter++
                        if (isString(newToken[newToken.length - 1].toString())) {
                            isWritingString = false
                            break@tokens
                        }
                    }
            }
            if (newToken.isNotEmpty() && isSpace(currentLine[charCounter])) {
                charCounter++
                break@tokens
            }

            if (newToken.isNotEmpty() && isSymbol(currentLine[charCounter].toString(), symbols)) {
                break@tokens
            }

            newToken = newToken.plus(currentLine[charCounter].toString())
            charCounter++

        }
        if (removeWhitespace(newToken).isNotEmpty()) {
            currentToken = newToken.trim()
        }
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
        currentLine = scanner.nextLine()
    }

}
