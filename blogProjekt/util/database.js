import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite');

db.prepare(`CREATE TABLE IF NOT EXISTS blogs
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    publisher STRING NOT NULL,
    title STRING NOT NULL,
    category STRING NOT NULL,
    content STRING NOT NULL,
    date DATE NOT NULL,
    dateOfLastUpdate DATE NOT NULL
    )`).run();

export const getBlogs = () => db.prepare(`SELECT * FROM blogs`).all();

export const getBlog = (id) => db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(id);

export const saveBlog = (publisher, title, category, content, date, dateOfLastUpdate) => db.prepare(`INSERT INTO blogs (publisher, title, category, content, date, dateOfLastUpdate) VALUES (?,?,?,?,?,?)`).run(publisher, title, category, content, date, dateOfLastUpdate);

export const updateBlog = (id, publisher, title, category, content, date, dateOfLastUpdate) => db.prepare(`UPDATE blogs SET publisher = ?, title = ?, category = ?, content = ?, date = ?, dateOfLastUpdate = ? WHERE id = ?`).run(publisher, title, category, content, date, dateOfLastUpdate,id);

export const deleteBlog = (id) => db.prepare(`DELETE FROM blogs WHERE id = ?`).run(id);
