import sqlite from 'sqlite3';

const db = new sqlite.Database('./data/albumDb.sqlite');

export function dbAll(sql, params = []){
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

export function dbGet(sql, params = []){
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

export function dbRun(sql, params=[]){
    return new Promise((resolve, reject)=>{
        db.run(sql, params, function (err){
            if(err) reject(err);
            else resolve(this);
        });
    });
};

export async function initializeDatabase() {
    await dbRun(
        `CREATE TABLE IF NOT EXISTS albums (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            artist STRING NOT NULL,
            title STRING NOT NULL,
            year INTEGER NOT NULL,
        );
        CREATE TABLE IF NOT EXISTS songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            album_id INTEGER NOT NULL,
            title STRING NOT NULL,
            duration INTEGER NOT NULL,
            FOREIGN KEY (album_id) REFERENCES albums(id)
        );`
    );

    for (const entry of albums) {
        await dbRun(
            "INSERT OR IGNORE INTO albums(artist, title, year) VALUES (?, ?, ?);",
            [entry.artist, entry.title, entry.year]
        );
    }

    for (const entry of songs) {
        await dbRun(
            "INSERT OR IGNORE INTO songs(album_id, title, duration) VALUES (?, ?, ?);",
            [entry.album_id, entry.title, entry.duration]
        );
    }
}
