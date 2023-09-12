package jackcompiler

import java.io.File

class CompilationEngine(private val tokenizer: JackTokenizer, private val outputStream: String) {
    private val output = File(outputStream)
    private val classVarDec = arrayOf("STATIC", "FIELD")
    private val subroutine = arrayOf("CONSTRUCTOR", "METHOD", "FUNCTION")
    private var indentationCounter = 1

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
            }
            if (isSubroutine()) {
                compileSubroutine()
            }
            write()
        }
        indentationCounter --
        output.appendText("</class>")
    }

    fun compileClassVarDec() {
        writeCategory("<classVarDec>")
        indentationCounter ++
        while (tokenizer.hasMoreTokens()) {
            write()
            tokenizer.advance()
            if (isSubroutine()) {
                break
            }
        }
        indentationCounter --
        writeCategory("</classVarDec>")

    }

    fun compileSubroutine() {
        writeCategory("<subroutineDec>")
        indentationCounter ++
        while (tokenizer.hasMoreTokens() ) {
            write()
            tokenizer.advance()
        }
        indentationCounter --
        writeCategory("</subroutineDec>")

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
}