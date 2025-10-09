import express from 'express';
import * as db from './data/post.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status('Posts');
});

router.get('/posts', (req, res) => {
    const posts = db.getPosts();
    res.status(200).json(posts);
});

router.get('/posts/:id', (req, res) => {
    const post = db.getPostById(+req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'post not found' });
    }

    res.status(200).json(user);
});

router.post('/posts', (req, res) => {});

router.put('/posts/:id', (req, res) => {});

router.delete('/posts/:id', (req, res) => {});

export default router;
