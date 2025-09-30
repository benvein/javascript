import express from 'express';
import cors from 'cors';
import * as db from './data/db.js';
import bcrypt from 'bcrypt';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/users', (req, res) => {
    const users = db.getUsers();
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = db.getUserById(+req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }
    res.json(user);
});

app.post('/users', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'invalid credentials' });
    }

    const salt = bcrypt.genSaltSync();
    const hashedPw = bcrypt.hashSync(password, salt);
    const saved = db.saveUser(email, hashedPw);
    const user = db.getUserById(saved.lastInsertRowid);
    res.status(201).json(user);
});

app.post('/login', (req, res) => {});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
