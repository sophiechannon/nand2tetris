# Splot

## Idea

- a circle containing a letter "randomly" appears on the screen
- the program waits for the user to clear the circle by pressing the corresponding letter
- game is won when circles are all cleared
- game is lost if an incorrect key is pressed
- it will have 0 replay value and will be extremely boring

## Required OS objects & methods

- `Screen.setColor`, `Screen.drawCircle` - to draw & erase the circles
- `Output.moveCursor`, `Output.printChar` - to print the letter
- `Sys.wait` - can this be used to set the timeout between circles being drawn, or will it pause the whole program?
- `Keyboard.readChar` or `Keyboard.keyPressed` to identify when the keyboard is pressed

## Required classes

- `Circle` - draws the circle, sets the character, erases circle, cleans up

  - fields
    - `letter` (char)
    - `x` (int)
    - `y` (int)
  - methods
    - `new()`
    - `dispose()`
    - `draw(x, y)`

- `Game` - creates circles in random locations at set intervals, counts number of active circles, erases circles when correct key is pressed, ends game when circles have been cleared, cleans up
- fields
  - `counter` - the charAt value for the letter you are on / index for location, increments each time a circle is cleared
- methods
  - `new()`
  - `dispose()`
  - `run()`
    - draws a circle, waits, if correct it erases circle and the loop continues. If the wrong key is pressed, it skips to fail and ends the game. If the end of the letter string is reached, the success method is called and the game is ended.
  - `success()`
  - `fail()`
- static
  - `letters` (string) - a-z in random order
  - `coordinates` (int array) - 26 possible circle locations
- `Main` - runs the game in a loop & cleans up

## Design thoughts

- If output color can't be changed, make whole screen black, draw circle in white, and print the letter in black again (will require `Screen.drawRectangle` for the entire size of the screen on initialization)
