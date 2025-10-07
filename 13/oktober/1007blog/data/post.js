import db from './db.js';

db.prepare(
    `
    CREATE TABLE IF NOT EXISTS posts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userID INTEGER,
    title TEXT, 
    content TEXT,
    FOREIGN KEY (userID) REFERENCES users(id)
    )`,
).run();

export const getPosts = () => db.prepare('SELECT * FROM posts').all();
export const getPostById = (id) => db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
export const createPost = (userID, title, content) =>
    db
        .prepare('INSERT INTO posts (userId, title, content) VALUES (?,?,?)')
        .run(userID, title, content);
export const updatePost = (id, userID, title, content) =>
    db
        .prepare('UPDATE posts SET userId = ?, title = ?, title = ?, content = ?, WHERE id = ?')
        .run(userID, title, content, id);
export const deletePost = (id) => db.prepare('DELETE FROM posts WHERE id = ?').run(id);
