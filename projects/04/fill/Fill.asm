// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

@16384 // set first screen to m[0] (static) and m[1] (in/decrementer)
  D=A
  @0
  M=D
  @1
  M=D

  @24575 // set last screen to m[2]
  D=A
  @2
  M=D

  @24576 // check to see if the key is being pressed
  D=M
  @WHITEHOLD // jump to white hold if not being pressed (0)
  D;JEQ

(BLACKLOOP)
  @1
  A=M // read value at m[@1]
  M=!M // invert it (make it black)
  @1
  M=M+1 // increment m[@1+1]
  D=M // save that value
  @2
  D=D-M // check if max address is reached
  @BLACKLOOP // go back to loop if not reached
  D;JLE

(BLACKHOLD) //hold black screen once max register is reached
  @24576
  D=M
  @BLACKHOLD // continue to hold black if key being held (!0)
  D;JNE

  @1
  M=M-1

(WHITELOOP) // basically the opposite of blackloop
  @1
  A=M 
  M=!M 
  @1
  M=M-1 
  D=M 
  @0
  D=D-M 
  @WHITELOOP // continue loopin' until min register
  D;JGE

(WHITEHOLD)
  @24576
  D=M
  @WHITEHOLD // continue holding white if key not being pressed (0)
  D;JEQ
  
  @BLACKLOOP // go to black loop once key is pressed (!0)
  0;JMP