import input from "../input.js";

let id = await input("id: ");

await whatToDo()

async function whatToDo(){
    let choice = await input("1 get\n2 create\n3 update\n4 patch\n5 del\n6 end\n");

    
        switch(choice){
            case '1':
                fetchUser(id);
                break;
            case '2':
                createTodo();
                break;
            case '3':
                updateTodo(id);
                break;
            case '4':
                patchTodo(id);
                break;
            case '5':
                deleteTodo(id);
                break;
            default:
                return;
        }
    
}

function fetchUser(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
        .then((response) => response.json())
        .then((json) => console.log(json));
}

function createTodo(){
    fetch('https://jsonplaceholder.typicode.com/users/todos', {
        method: 'POST',
        body: JSON.stringify({
          title: 'foo',
          completed: true,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

function updateTodo(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`, {
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: 'foo',
          completed: false,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

function patchTodo(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/todos`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: 'foo',
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

function deleteTodo(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/todos`, {
        method: 'DELETE',
      });
}