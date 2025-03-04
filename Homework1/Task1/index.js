import fs from "fs";
import fsPromises from "fs/promises";

const homeworkTextPath = "./homework.txt";

console.log('****** SYNCRONOUS FILE SYSTEM OPERATIONS ******');

// Write to the file synchronously
fs.writeFileSync(homeworkTextPath, "Homework 02 in Basic Node");

//fs.writeFileSync("./homework.txt", "Homework 02 in Basic Node"); - Bad practice

// const homeworkTextPath = "homework.txt"; - Bad practice

// Append to the file synchronously
fs.appendFileSync(homeworkTextPath, "\nFINISHED!");

// Read the file synchronously
const homeworkTextContents = fs.readFileSync(homeworkTextPath, {encoding: 'utf8'});

console.log(homeworkTextContents);

console.log('***** ASYNCROUNOUS FILE SYSTEAM OPERATIONS *****');

const contents = "Homework 02 in Basic Node async older way";

// OLDER WAY
fs.writeFile(homeworkTextPath, contents, (error) => {
    if(error){
        console.error("Error occured:", error)
    };
    
    console.log('Write to file async finished.')
});

// NEWER WAY
// WRITE TO FILE ASYNC
await fsPromises.writeFile(homeworkTextPath, 'Homework 02 in Basic Node async newer way');

// APPEND TO FILE ASYNC
await fsPromises.appendFile(homeworkTextPath, '\nFinished! async');

// READ FILE ASYNC
const textRead = await fsPromises.readFile(homeworkTextPath, 'utf8');
console.log(textRead);