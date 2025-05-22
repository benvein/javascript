import express from 'express';
import * as db from './util/database.js';

const port = 8080;
const app = express();
app.use(express.json());

app.use(express.static(path.join(root, "views")));

app.get("/", (req, res) => {
    res.sendFile(path.join(root, "views", "index.html"));
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
        const{publisher, title, category, content, date, dateOfLastUpdate} = req.body;
        if(!publisher || !title || !category || !content || !date || !dateOfLastUpdate){
            return res.status(400).json({ message: 'everything is required' });
        }
        const savedBlog = db.saveBlog(publisher, title, category, content, date, dateOfLastUpdate);
        if(savedBlog.changes != 1){
            return res.status(501).json({ message: 'Error saving blog' });
        }
        res.status(201)
    }
    catch(err){
        res.status(500).json({ message: `${err}`});
    }
});

//publisher, title, category, content, date, dateOfLastUpdate