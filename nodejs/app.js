import express from 'express';
import __dirname from './util/rootpath.js';

const app = express();

app.get('/', (req, res) => {
    res.send("szia :D");
})

app.get('/index', (req,res) => {
    res.sendFile("./views/index.html", {root : __dirname});
})

app.listen(3000, () => {
    console.log('server runs on port 3000');
});