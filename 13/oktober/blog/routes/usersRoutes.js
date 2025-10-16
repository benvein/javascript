import express from 'express';
import * as db from '../data/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Users');
});

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    const salt = bcrypt.genSaltSync(12);
    const hashedPw = bcrypt.hashSync(password, salt);
    const saved = db.createUser(name, email, hashedPw);
    const user = db.getUserById(saved.lastInsertRowid);
    delete user.password;
    res.status(201).json(user);
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    const user = db.getUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: 'Invalid credentials' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, userEmail: user.email }, 'secret_key', {
        expiresIn: '30m',
    });
    res.json(token);
});

router.get("/me", auth, (req,res)=> {
    const user = db.getUserById(req.userId);
    delete user.password;
    res.json(user);
})

function auth(req,res,next){
    const accessToken = req.headers.authorization;
    if(!accessToken){
        return res.status(401).json({message: "Unauthorized"});
    }
    const token = jwt.verify(accessToken.split(' ')[1], "secret_key");
    const now = Math.floor(Date.now() / 1000);
    if(!token.next || ! token.exp<now){
        return res.status(403).json({message:"token expired"});
    }
    req.userId = token.userId;
    req.userEmail = token.userEmail;
    next();
}

export default router;
