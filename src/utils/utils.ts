import * as fs from 'fs';
import * as path from 'path';

// let students =  JSON.parse(fs.readFileSync(studentPath).toString());
// let classes =  JSON.parse(fs.readFileSync(classPath).toString());

const studentPath = '../../data/students.json'
const classPath = '../../data/classes.json'

export function readJsonFileAsync(relativePath: string) {
    const absolutePath = path.resolve(__dirname, relativePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent) ;
  }




export function generateRandomID(prefix: string, length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = prefix + '_';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


export function writeData(filePath: string, data ){
    try {
        const absolutePath = path.resolve(__dirname, filePath);
        fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Data successfully written to ${absolutePath}`);
      } catch (err) {
        console.error(`Error writing to file: ${err.message}`);
      }
}

export function checkStudentByName(name: String){
    let students = readJsonFileAsync(studentPath)
    const student = students.find( (el ) => el.name === name);
    return student
}

export function checkStudentById(id: String){
    let students = readJsonFileAsync(studentPath)
    const student = students.find( (el ) => el.id === id);
    return student
}

export function checkClassByName(name: String){
    let classes = readJsonFileAsync(classPath)
    const classD = classes.find( (el ) => el.name === name);
    return classD
}

export function checkClassById(id: String){
    let classes = readJsonFileAsync(classPath)
    const classD = classes.find( (el ) => el.id === id);
    return classD
}








