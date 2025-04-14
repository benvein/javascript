import sqlite from 'sqlite3';

const db = new sqlite.Database('./data/timetableDb.sqlite');

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
}

export async function initializeDatabase() {
    // Create the table only if it doesn't already exist
    await dbRun(
        `CREATE TABLE IF NOT EXISTS timetable (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            day STRING NOT NULL,
            subject STRING NOT NULL,
            period INTEGER NOT NULL,
            UNIQUE(day, period)
        );`
    );

    // Optional: Insert default records only if the table is empty
    const existingRecords = await dbAll("SELECT COUNT(*) as count FROM timetable;");
    if (existingRecords[0].count === 0) {
        const timetable = [
            { day: "Monday", subject: "Maths", period: 1 },
            { day: "Tuesday", subject: "English", period: 3 },
            { day: "Wednesday", subject: "PE", period: 6 },
            { day: "Friday", subject: "Physics", period: 2 }
        ];

        for (const entry of timetable) {
            await dbRun(
                "INSERT OR IGNORE INTO timetable(day, subject, period) VALUES (?, ?, ?);",
                [entry.day, entry.subject, entry.period]
            );
        }
    }
}