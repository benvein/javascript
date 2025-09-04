import express from "express";
import cors from "cors";
import { initializeDatabase, dbAll, dbGet, dbRun } from "./util/database.js";
import root from "./util/rootpath.js";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(root, "views")));

app.get("/", (req, res) => {
    res.sendFile(path.join(root, "views", "addAlbum.html"));
});

app.get("/albums", async (req, res) => {
    try {
        const albums = await dbAll("SELECT * FROM albums;");
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch albums" });
    }
});

app.get("/albums/:id", async (req, res) => {
    try {
        const album = await dbGet("SELECT * FROM albums WHERE id = ?;", [req.params.id]);
        if (!album) {
            return res.status(404).json({ error: "Album not found" });
        }
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch album" });
    }
});

app.post("/albums", async (req, res) => {
    const { artist, title, year } = req.body;
    if (!artist || !title || !year) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const result = await dbRun(
            "INSERT INTO albums (artist, title, year) VALUES (?, ?, ?);",
            [artist, title, year]
        );
        res.status(201).json({ id: result.lastID, artist, title, year });
    } catch (error) {
        res.status(500).json({ error: "Failed to add album" });
    }
});

app.put("/albums/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const album = await dbGet("SELECT * FROM albums WHERE id = ?;", [id]);
        if (!album) {
            return res.status(404).json({ error: "Album not found" });
        }
        const { artist, title, year } = req.body;
        if (!artist || !title || !year) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        await dbRun(
            "UPDATE albums SET artist = ?, title = ?, year = ? WHERE id = ?;",
            [artist, title, year, id]
        );
        res.status(200).json({ id, artist, title, year });
    } catch (error) {
        res.status(500).json({ error: "Failed to update album" });
    }
});

app.delete("/albums/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const album = await dbGet("SELECT * FROM albums WHERE id = ?;", [id]);
        if (!album) {
            return res.status(404).json({ error: "Album not found" });
        }
        await dbRun("DELETE FROM albums WHERE id = ?;", [id]);
        res.status(200).json({ message: "Album deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete album" });
    }
});

app.get("/albums/:id/songs", async (req, res) => {
    const albumId = req.params.id;
    try {
        const songs = await dbAll("SELECT * FROM songs WHERE album_id = ?;", [albumId]);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch songs" });
    }
});

app.delete("/songs/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const song = await dbGet("SELECT * FROM songs WHERE id = ?;", [id]);
        if (!song) {
            return res.status(404).json({ error: "Song not found" });
        }
        await dbRun("DELETE FROM songs WHERE id = ?;", [id]);
        res.status(200).json({ message: "Song deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete song" });
    }
});

app.post("/albums/:id/songs", async (req, res) => {
    const albumId = req.params.id;
    const { title, duration } = req.body;
    if (!title || !duration) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const result = await dbRun(
            "INSERT INTO songs (album_id, title, duration) VALUES (?, ?, ?);",
            [albumId, title, duration]
        );
        res.status(201).json({ id: result.lastID, album_id: albumId, title, duration });
    } catch (error) {
        res.status(500).json({ error: "Failed to add song" });
    }
});

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({ message: `Error: ${err.message}` });
    } else {
        next();
    }
});

async function startServer() {
    await initializeDatabase();
    app.listen(3000, () => {
        console.log("AlbumProjekt server running on port 3000");
    });
}

startServer();
