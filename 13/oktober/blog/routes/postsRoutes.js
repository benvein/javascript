import express from 'express';
import * as db from '../data/post.js';

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

router.put('/posts/:id', (req, res) => {
    const id = +req.params.id;
    const post = db.getPostById(id);
    if (!post) {
        return res.status(400).json({ message: 'Post not found' });
    }
    const { userId, title, content } = req.body;
    if (!userId || !title || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    db.updatePost(id, userId, title, content);
    const updatedPost = db.getPostById(id);
    res.status(200).json(updatedPost);
});

router.delete('/posts/:id', (req, res) => {
    const id = +req.params.id;
    const post = db.getPostById(id);
    if(!post){
        return res.status(404).json({message: "post not found"});
    }
    db.deletePost(id);
    res.status(204).json({message: "post deleted;"})
});

export default router;
