import express from 'express';

const PORT = 3000;

const app = express();
app.use(express.json);

let users = [
    { id: 1, name: 'a', age: 18 },
    { id: 2, name: 'b', age: 67 },
    { id: 3, name: 'c', age: 33 },
    { id: 4, name: 'd', age: 24 },
];

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
    const id = +req.params.id;
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }

    res.status(200).json(user);
});

app.post('/users', (req, res) => {
    //const name = req.body.name;
    //const age = req.body.age;
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    //const id = users[users.length-1]?.id + 1 || 1;
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const user = { id, name, age };

    users.push(user);

    res.status(201).json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = +req.params.id;
    /*const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }
    const index = users.findIndex(user);
    users.splice(index, 1);*/
    users = users.filter(user => user.id !== id);
    res.status(200).json({ message: 'user deleted' });
});

app.put("/users/:id", (req,res) => {
    const id = Number(req.params.id);
    let user = users.find((user) => user.id === id);
    if(!user){
        return res.status(404).json({message: "user not found"});
    }
    const {name, age} = req.body;
    if(!name || !age){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const index = users.indexOf(user);
    //user = {id: user.id, name: name, age: age};
    user = {...user, name, age};
    users[index] = user;
    res.status(200).json(user);
});

app.patch("/users/:id", (req,res) => {
    const id = parseInt(req.params.id);
    let user = users.find((user) => user.id === id);
    if(!user){
        return res.status(404).json({message: "user not found"});
    }
    const {name, age} = req.body;
    const index = users.indexOf(user);
    user = {id: user.id, name: name || user.name, age: age ||user.age};
    users[index] = user;
    res.status(200).json(user);
});

app.listen(PORT, () => {
    console.log('running on http://localhost:' + PORT);
});
