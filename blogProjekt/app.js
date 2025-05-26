import express from 'express';
import * as db from './util/database.js';
import path from 'path';
import { fileURLToPath } from 'url';

const port = 8080;
const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = __dirname;

app.use(express.static(path.join(root, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(root, "public", "index.html"));
});

app.get('/blogs', (req,res) => {
    try{
        const blogs = db.getBlogs();
        res.status(200).json(blogs);
    }catch(err){
        res.status(500).json({ message: `${err}`});
    }
});

app.get('/blogs/:id', (req,res) => {
    try{
        const blog = db.getBlog(req.params.id);
        if(!blog){
            return res.status(404).json({ message: 'blog not found' });
        }
        res.status(200).json(blog);
    } 
    catch(err){
        res.status(500).json({ message: `${err}`});
    }
});

app.post('/blogs', (req,res)=>{
    try{
        const{publisher, title, category, content, date} = req.body;
        if(!publisher || !title || !category || !content || !date){
            return res.status(400).json({ message: 'everything is required' });
        }
        const dateOfLastUpdate = new Date().toISOString().split('T')[0];
        const savedBlog = db.saveBlog(publisher, title, category, content, date, dateOfLastUpdate);
        if(savedBlog.changes != 1){
            return res.status(501).json({ message: 'Error saving blog' });
        }
        res.status(201).json({ message: 'Blog created successfully' });
    }
    catch(err){
        res.status(500).json({ message: `${err}`});
    }
});

app.put('/blogs/:id', (req, res) => {
    try {
        const id = req.params.id;
        const { publisher, title, category, content, date } = req.body;
        if (!publisher || !title || !category || !content || !date) {
            return res.status(400).json({ message: 'everything is required' });
        }
        const dateOfLastUpdate = new Date().toISOString().split('T')[0];
        const updatedBlog = db.updateBlog(id, publisher, title, category, content, date, dateOfLastUpdate);
        if (updatedBlog.changes !== 1) {
            return res.status(501).json({ message: 'Error updating blog' });
        }
        res.status(200).json({ message: 'Blog updated successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.delete('/blogs/:id', (req, res) => {
    try {
        const id = req.params.id;
        const deletedBlog = db.deleteBlog(id);
        if (deletedBlog.changes !== 1) {
            return res.status(404).json({ message: 'Blog not found or could not be deleted' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});