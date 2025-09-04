import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite');

db.prepare(`CREATE TABLE IF NOT EXISTS blogs
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    publisherId INTEGER NOT NULL,
    title STRING NOT NULL,
    category STRING NOT NULL,
    content STRING NOT NULL,
    date TEXT NOT NULL,
    dateOfLastUpdate TEXT NOT NULL,
    FOREIGN KEY (publisherId) REFERENCES publishers(id)
    )`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS publishers
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING NOT NULL
    )`).run();

export const getBlogs = () => db.prepare(`SELECT * FROM blogs`).all();

export const getBlog = (id) => db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(id);

export const saveBlog = (publisherId, title, category, content, date, dateOfLastUpdate) => db.prepare(`INSERT INTO blogs (publisherId, title, category, content, date, dateOfLastUpdate) VALUES (?,?,?,?,?,?)`).run(publisherId, title, category, content, date, dateOfLastUpdate);

export const updateBlog = (id, publisherId, title, category, content, date, dateOfLastUpdate) => db.prepare(`UPDATE blogs SET publisherId = ?, title = ?, category = ?, content = ?, date = ?, dateOfLastUpdate = ? WHERE id = ?`).run(publisherId, title, category, content, date, dateOfLastUpdate,id);

export const deleteBlog = (id) => db.prepare(`DELETE FROM blogs WHERE id = ?`).run(id);

export const getPublishers = () => db.prepare(`SELECT * FROM publishers`).all();

export const getPublisher = (id) => db.prepare(`SELECT * FROM publishers WHERE id = ?`).get(id);

export const savePublisher = (name) => db.prepare(`INSERT INTO publishers (name) VALUES (?)`).run(name);

export const updatePublisher = (id, name) => db.prepare(`UPDATE publishers SET name = ? WHERE id = ?`).run(name, id);

export const deletePublisher = (id) => db.prepare(`DELETE FROM publishers WHERE id = ?`).run(id);