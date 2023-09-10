/*
 * This Kotlin source file was generated by the Gradle 'init' task.
 */
package jackcompiler

import java.io.File
import java.nio.file.Files
import java.nio.file.Paths


fun main(args: Array<String>) {
    Files.walk(Paths.get("../Square"))
        .filter {
            it.toString().endsWith(".jack")
        }
        .forEach {
            val tokenizer = JackTokenizer(it.toString())
            while (tokenizer.hasMoreTokens()) {
                tokenizer.advance()
            }
        }
//    val outputT = File("../ArrayTest/MainToken.xml")
}


