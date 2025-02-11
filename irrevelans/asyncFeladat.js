async function GetAllPosts() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json();
        return data;
    } catch(error){
        console.error("hiba", error);
    }
}

  
async function GetPostById(id) {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const data = await response.json();
        return data;
    } catch(error){
        console.error("hiba", error);
    }
}
  
async function CreatePost() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
            method: 'POST',
            body: JSON.stringify({
              title: 'foo',
              body: 'bar',
              userId: 1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
        const data = await response.json();
        return data;
    } catch(error){
        console.error("hiba", error);
    }
}
  
async function UpdatePost(id) {  
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              id: 1,
              title: 'foo',
              body: 'bar',
              userId: 1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        return data
    } catch(error){
        console.error("hiba", error);
    }    
}
  
async function PatchPost(id) {  
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { 
            method: 'PUT',
            body: JSON.stringify({
              title: 'foo',
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        return data;
    } catch(error){
        console.error("hiba", error);
    }
}
  
async function DeletePost(id) {  
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json();
        return data;
    } catch(error){
        console.error("hiba", error);
    }   
}

//await GetAllPosts();
console.log(await GetPostById(1));
console.log(await CreatePost());
console.log(await UpdatePost(1));
console.log(await PatchPost(1));
console.log(await DeletePost(2));