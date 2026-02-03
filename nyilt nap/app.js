import express from 'express';
import * as db from './queries.js';

const app = express();
app.use(express.json());

const PORT = 3321;

app.get('/telepules/:telepules', (req, res) => {
    const students = db.getStudentsByCity(req.params.telepules);
    res.status(200).json(students);
});

app.get('/tanora', (req, res) => {
    const classes = db.getEnglishClasses();
    res.status(200).json(classes);
});

app.get("/9-matematika-fizika", (req,res) => {
    const classes = db.getMathsAndPhysicsClassesIn9thGrade();
    res.status(200).json(classes);
});



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/nyiltnap/api/v1`);
});
