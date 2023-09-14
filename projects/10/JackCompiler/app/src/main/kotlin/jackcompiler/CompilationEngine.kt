package jackcompiler

import java.io.File

class CompilationEngine(private val tokenizer: JackTokenizer, private val outputStream: String) {
    private val output = File(outputStream)
    private val classVarDec = arrayOf("STATIC", "FIELD")
    private val subroutine = arrayOf("CONSTRUCTOR", "METHOD", "FUNCTION")
    private val statements = arrayOf("DO", "WHILE", "RETURN", "LET")

    private var indentationCounter = 1
    private var isSubroutineStart = false;
    private var isReadyForExpressionOrParams = false;

    init {
        println(outputStream)
        compileClass()
    }

    fun compileClass() {
        output.writeText("<class>\n")
        compClass@ while (tokenizer.hasMoreTokens()) {
            tokenizer.advance()
            if (isClassVarDec()) {
                compileClassVarDec()
            } else if (isSubroutine()) {
                compileSubroutine()
            } else
                write()
        }
        indentationCounter --
        output.appendText("</class>")
    }

    fun compileClassVarDec() {
        writeCategory("<classVarDec>")
        indentationCounter ++
        while (tokenizer.hasMoreTokens()) {
            writeAndAdvance()
            if (isSubroutine()) {
                break
            }
        }
        indentationCounter --
        writeCategory("</classVarDec>")

    }

    fun compileSubroutine() {
        isSubroutineStart = true
        writeCategory("<subroutineDec>")
        indentationCounter ++
        while (tokenizer.hasMoreTokens() ) {
            writeAndAdvance()
            if (isParamList()) {
                compileParameterList()
            }
            if (isSubBody()) {
                compileSubroutineBody()
                break
            }
            if (isParamListUpcoming()) {
                isReadyForExpressionOrParams = true
            }

        }
        indentationCounter --
        writeCategory("</subroutineDec>")

    }

    fun compileParameterList() {
        isReadyForExpressionOrParams = false
        writeCategory("<parameterList>")
        indentationCounter ++
        while (tokenizer.hasMoreTokens()) {
            if (isCloseBrackets()) break
            writeAndAdvance()
        }
        indentationCounter --
        writeCategory("</parameterList>")
    }


    fun compileSubroutineBody() {
        isSubroutineStart = false
        writeCategory("<subroutineBody>")
        indentationCounter ++
        while (tokenizer.hasMoreTokens()) {
            if (isVarDec()) {
                compileVarDec()
            } else {
                writeAndAdvance()
            }
            if (isCloseBraces()) { break }
        }
        indentationCounter --
        writeCategory("</subroutineBody>")
    }

    fun compileVarDec() {
        writeCategory("<varDec>")
        indentationCounter ++
        while (tokenizer.hasMoreTokens()) {
            writeAndAdvance()
            if (isSemiColon()) {
                writeAndAdvance()
                break
            }
        }
        indentationCounter --
        writeCategory("</varDec>")
    }



    // private funcs

    private fun write() {
        val string = getIndentations() + tokenizer.getStringToWrite()
        output.appendText(string)
    }

    private fun writeCategory(category: String) {
        val string = getIndentations() + category + "\n"
        output.appendText(string)
    }

    private fun getIndentations(): String {
        return "\t".repeat(indentationCounter)
    }

    private fun isClassVarDec(): Boolean {
        return classVarDec.contains(tokenizer.keyword())
    }

    private fun isSubroutine(): Boolean {
        return subroutine.contains(tokenizer.keyword())
    }

    private fun isSubBody(): Boolean {
        return isSubroutineStart && isBraces()
    }

    private fun isParamListUpcoming(): Boolean {
        return isOpenBrackets() && isSubroutineStart
    }

    private fun isParamList(): Boolean {
        return isSubroutineStart && isReadyForExpressionOrParams
    }

    private fun isVarDec(): Boolean {
        return tokenizer.keyword() == "VAR"
    }

    private fun isLetDec(): Boolean {
        return tokenizer.keyword() == "VAR"
    }

    private fun isOpenBrackets(): Boolean {
        return tokenizer.symbol() === '('
    }

    private fun isCloseBrackets(): Boolean {
        return tokenizer.symbol() === ')'
    }

    private fun isBraces(): Boolean {
        return tokenizer.symbol() === '{'
    }

    private fun isCloseBraces(): Boolean {
        return tokenizer.symbol() === '}'
    }

    private fun isSemiColon(): Boolean {
        return tokenizer.symbol() === ';'
    }

    private fun writeAndAdvance() {
        write()
        tokenizer.advance()
    }
}