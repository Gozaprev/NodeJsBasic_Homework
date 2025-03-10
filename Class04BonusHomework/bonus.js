import http from "http";

const todos = [
    {id: 1, title: 'Learn nodejs.', isDone: false},
    {id: 2, title: 'Walk the dog.', isDone: false},
    {id: 3, title: 'Go to the store.', isDone: false}
];

const server = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;

    console.log(url, method);
    
    // localhost:3001 && method is GET
    if(url === "/" && method === "GET"){
        return response.end('Server is live.');
    }

    // localhost:3001/todos
    if(url === '/todos' && method === "GET"){
        return response.end(JSON.stringify(todos));
    }

    if(url === '/todos' && method === "POST"){
        // POST method to create an entity into the database
        // ...logic to create something
        response.statusCode = 201; // by convention statusCode when creating new entity is 201 => CREATED
        return response.end(JSON.stringify({message: "Todo created"}));
    }

    const isTodoById = url.includes('todos/');
    // localhost:3001/todos/1 (/1 or any other number)
    if(isTodoById && method === "GET"){
        const urlSplitted = url.split('/');
        const id = urlSplitted[2];
        const todoFound = todos.find((todo) => todo.id === parseInt(id));

        if(todoFound){
            return response.end(JSON.stringify(todoFound));
        }

        const notFoundResponse = {
            message: `Todo with id: ${id} was not found`
        };

        // IF ENTITY(TODO) IS NOT FOUND => 404
        response.statusCode = 404;
        return response.end(JSON.stringify(notFoundResponse));
    }

    // Challenge #1: DELETE request to delete a todo by ID
    if(isTodoById && method === "DELETE"){
        const urlSplitted = url.split('/');
        const id = parseInt(urlSplitted[2]);
        const todoIndex = todos.findIndex((todo) => todo.id === id);

        if(todoIndex !== -1){
            todos.splice(todoIndex, 1); // Remove the todo from the array
            response.statusCode = 200; // OK
            return response.end(JSON.stringify({message: `Todo with ID ${id} was deleted successfully.`}));
        }

        const notFoundResponse = {
            message: `Todo with id: ${id} was not found`
        };

        // IF ENTITY(TODO) IS NOT FOUND => 404
        response.statusCode = 404;
        return response.end(JSON.stringify(notFoundResponse));
    }

    // If no route matched, return 404
    response.statusCode = 404;
    return response.end(JSON.stringify({message: "Route not found"}));
});

server.listen(3001, "localhost", () => {
    console.log('Server is up and running! 🚀');
});
