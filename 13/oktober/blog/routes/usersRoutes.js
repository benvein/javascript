import express from 'express';
import * as db from '../data/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Users');
});

router.get('/users', (req, res) => {
    const users = db.getUsers();
    res.status(200).json(users);
});

router.get('/users/:id', (req, res) => {
    const user = db.getUserById(+req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'usernot found' });
    }
    res.status(200).json(user);
});

router.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    const salt = bcrypt.genSaltSync();
    const hashedPw = bcrypt.hashSync(password, salt);
    const saved = db.createUser(name, email, hashedPw);
    const user = db.getUserById(saved.lastInsertRowId);
    res.status(201).json(user);
});

router.put('/users/:id', (req, res) => {
    const id = +req.params.id;
    const user = db.getUserById(id);
    if (!user) {
        return res.status(404).json({ message: 'usernot found' });
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    db.updatePost(id, name, email, password);
    const updatedPost = db.getPostById(id);
    res.status(200).json(updatedPost);
});

router.delete('/users/:id', (req, res) => {
    const id = +req.params.id;
    const user = db.getUserById(id);
    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }
    db.deleteUser(id);
    res.status(204).json({ message: 'user deleted;' });
});



export default router;
