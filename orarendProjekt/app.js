import express from "express";
import cors from "cors";
import { initializeDatabase, dbAll, dbGet, dbRun } from "./util/database.js";
import __dirname from "./util/rootpath.js";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/timetable", async (req, res) => {
    const timetable = await dbAll("SELECT * FROM timetable;");
    res.status(200).json(timetable);
});

app.get("/timetable/:id", async (req, res) => {
    try {
        const record = await dbGet("SELECT * FROM timetable WHERE id = ?;", [req.params.id]);
        if (!record) {
            return res.status(404).json({ error: "Timetable entry not found" });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch timetable entry" });
    }
});

app.post("/timetable", async (req,res) => {
    const {day, subject, period} = req.body;
    if(!day || !subject || !period){
        return res.status(404).sendFile("./views/404.html", {root : __dirname});
    }
    const result = await dbRun(`INSERT INTO timetable (day, subject, period) VALUES (?, ?, ?);`, [day, subject, period]);
    res.status(201).json({id: result.lastID, day, subject, period});
});

app.put("/timetable/:id", async (req,res) => {
    const id = req.params.id;
    const record = await dbGet("SELECT * FROM timetable WHERE id = ?;", [id]);
    if(!record){
        return res.status(404).sendFile("./views/404.html", {root : __dirname});
    }
    const {day, subject, period} = req.body;
    if(!day || !subject || !period){
        return res.status(404).sendFile("./views/404.html", {root : __dirname});
    }
    dbRun("UPDATE timetable SET day = ?, subject = ?, period = ? WHERE id = ?;", [day, subject, period, id]);
    res.status(200).json({id, day, subject, period});
});

app.delete("/timetable/:id", async (req,res) => {
    const id = req.params.id;
    const record = await dbGet("SELECT * FROM timetable WHERE id = ?;", [id]);
    if(!record){
        return res.status(404).sendFile("./views/404.html", {root : __dirname});
    }
    dbRun("DELETE FROM timetable WHERE id = ?;", [id]);
    res.status(200).json({message: "deleted"});
});

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({ message: `Error: ${err.message}` });
    } else {
        next();
    }
});

async function startServer(){
    await initializeDatabase();
    app.listen(3000, () => {
        console.log("running on 3000");
    });
};

startServer();