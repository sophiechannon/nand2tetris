package jackcompiler

import java.io.File
import java.util.*

class CompilationEngine(private val inputStream: String, private val outputStream: String) {
    private val scanner = Scanner(File(inputStream))
    private val output = File(outputStream)


    init {
        println(outputStream)
        compileClass()
    }

    private fun compileClass() {
        output.writeText("<class>\n")
        output.appendText("</class>")
    }
}