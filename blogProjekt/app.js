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
        // Join blogs with publishers to get publisher name
        const blogs = db.getBlogs().map(blog => {
            const publisher = db.getPublisher(blog.publisherId);
            return { ...blog, publisherName: publisher ? publisher.name : 'Ismeretlen' };
        });
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
        const publisher = db.getPublisher(blog.publisherId);
        res.status(200).json({ ...blog, publisherName: publisher ? publisher.name : 'Ismeretlen' });
    } 
    catch(err){
        res.status(500).json({ message: `${err}`});
    }
});

app.post('/blogs', (req,res)=>{
    try{
        const{publisherId, title, category, content, date} = req.body;
        if(!publisherId || !title || !category || !content || !date){
            return res.status(400).json({ message: 'everything is required' });
        }
        const dateOfLastUpdate = new Date().toISOString();
        const savedBlog = db.saveBlog(publisherId, title, category, content, date, dateOfLastUpdate);
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
        const { publisherId, title, category, content, date } = req.body;
        if (!publisherId || !title || !category || !content || !date) {
            return res.status(400).json({ message: 'everything is required' });
        }
        const dateOfLastUpdate = new Date().toISOString();
        const updatedBlog = db.updateBlog(id, publisherId, title, category, content, date, dateOfLastUpdate);
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

app.get('/publishers', (req, res) => {
    try {
        const publishers = db.getPublishers();
        res.status(200).json(publishers);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.get('/publishers/:id', (req, res) => {
    try {
        const publisher = db.getPublisher(req.params.id);
        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }
        res.status(200).json(publisher);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.post('/publishers', (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const savedPublisher = db.savePublisher(name);
        if (savedPublisher.changes !== 1) {
            return res.status(501).json({ message: 'Error saving publisher' });
        }
        res.status(201).json({ message: 'Publisher created successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.put('/publishers/:id', (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const updatedPublisher = db.updatePublisher(id, name);
        if (updatedPublisher.changes !== 1) {
            return res.status(501).json({ message: 'Error updating publisher' });
        }
        res.status(200).json({ message: 'Publisher updated successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.delete('/publishers/:id', (req, res) => {
    try {
        const id = req.params.id;
        const deletedPublisher = db.deletePublisher(id);
        if (deletedPublisher.changes !== 1) {
            return res.status(404).json({ message: 'Publisher not found or could not be deleted' });
        }
        res.status(200).json({ message: 'Publisher deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});