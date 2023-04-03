import * as fs from "fs"

export default class Parser {
  file: string[];

  constructor(filePath: string) {
    const openFile = fs.readFileSync(filePath, 'utf8');
    this.file = openFile.split('\n');
  }

  getFile() {    
    return this.file
  }
}