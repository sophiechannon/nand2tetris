# JACK COMPILER

## Build and run from command line

- Build project (can be done from command line as below)

````
cd app
kotlinc src/main/kotlin/jackcompiler -include-runtime -d JackCompiler.jar
````

- run project

````
java -jar JackCompiler.jar <path_to_directory_or_file_from_current_directory>
```` 

## Build and run from IntelliJ

- Build project
- Run > Edit Configurations > program arguments <add path to directory>


