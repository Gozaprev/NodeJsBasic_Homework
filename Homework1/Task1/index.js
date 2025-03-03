import fs from "fs";
import fsPromises from "fs/promises";

console.log('****** SYNCRONOUS FILE SYSTEM OPERATIONS ******');

fs.writeFileSync("./homework.txt", "Homework 02 in Basic Node");

const homeworkTextPath = "homework.txt";

fs.appendFileSync(homeworkTextPath, "\nFINISHED!");

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