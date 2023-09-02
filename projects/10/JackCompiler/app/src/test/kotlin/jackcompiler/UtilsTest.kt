package jackcompiler

import org.junit.Test
import kotlin.test.assertEquals

class UtilsTest {
    @Test
    fun removeWhitespace() {
        val removesT = removeWhitespace("\t")
        assertEquals(removesT, "")
        val removesN = removeWhitespace("\n")
        assertEquals(removesN, "")
        val removesR = removeWhitespace("\r")
        assertEquals(removesR, "")
        val removesS = removeWhitespace(" ")
        assertEquals(removesS, "")
    }

    @Test
    fun isSpace() {
        val res = isSpace(' ')
        assertEquals(res, true)
        val resFalse = isSpace('h')
        assertEquals(resFalse, false)
    }

    @Test
    fun isString() {
        val res = isString("\"")
        assertEquals(res, true)
        val resFalse = isString("s")
        assertEquals(resFalse, false)
    }

    @Test
    fun isInteger() {
        val zero = jackcompiler.isInteger('0')
        assertEquals(zero, true)
        val nine = jackcompiler.isInteger('9')
        assertEquals(nine, true)
        val resFalse = jackcompiler.isInteger('t')
        assertEquals(resFalse, false)
    }
}