import Database from "better-sqlite3";

const db = new Database("./data/database.sqlite")
db.prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email STRING, password STRING)").run();

export const getUser = (id) => db.prepare("SELECT * FROM users WHERE id = ?").get(id);
export const getAll = (id) => db.prepare("SELECT * FROM users").all();

const users = [
    {email: "e1@email.com", password: "p1pwd"},
    {email: "e2@email.com", password: "p2pwd"},
    {email: "e3@email.com", password: "p3pwd"},
    {email: "e4@email.com", password: "p4pwd"},
];