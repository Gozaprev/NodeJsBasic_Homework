import chalk from 'chalk';

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