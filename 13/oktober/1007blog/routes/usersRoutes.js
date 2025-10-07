import express from 'express';
import * as db from './data/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('users');
});

router.get('/users/:id', (req, res) => {
    const user = db.getUserById(+req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json(user);
});

router.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    const salt = bcrypt.genSaltSync();
    const hashedPw = bcrypt.hashSync(password, salt);
    const saved = db.createUser(name, email, hashedPw);
    const user = db.getUserById(saved.lastInsertRowid);
    res.status(201).json();
});

export default router;
