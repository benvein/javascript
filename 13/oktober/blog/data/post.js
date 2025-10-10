import db from './db.js';

db.prepare(
    `CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    content TEXT,
    FOREIGN KEY (userId) REFERENCES user(id)
    )`,
).run();

export const getPosts = () => db.prepare('SELECT * FROM post').all();
export const getPostById = (id) => db.prepare('SELECT * FROM post WHERE id = ?').get(id);
export const createPost = (userId, title, content) =>
    db
        .prepare('INSERT INTO post (userId, title, content) VALUES (?,?,?)')
        .run(userId, title, content);
export const updatePost = (id, userId, title, content) =>
    db
        .prepare('UPDATE post SET userId = ?, title = ?, content = ?, WHERE id = ?')
        .run(userId, title, content, id);
export const deletePost = (id) => db.prepare("DELETE FROM post WHERE id = ?").run(id);

