import chalk from 'chalk';

//The function below is shown and created only for exercise purposes, and is left as a future reminder
/*function printTodos(todos) {
    todos.forEach(todo => {
        if (todo.isDone) {
            console.log(chalk.green(todo.title)); 
        } else {
            console.log(chalk.red(todo.title)); 
        }
    });
}
    */

const printTodos = (todos) => {
    todos.forEach(todo => {
        if (todo.isDone) {
            console.log(chalk.green(todo.title)); 
        } else {
            console.log(chalk.red(todo.title)); 
        }
    });
};


export default printTodos;