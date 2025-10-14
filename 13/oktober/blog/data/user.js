import db from './db.js';

db.prepare(
    `CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING,
    email STRING,
    password STRING
    )`,
).run();

export const getUsers = () => db.prepare('SELECT * FROM user').all();
export const getUserById = (id) => db.prepare('SELECT * FROM user').get(id);
export const createUser = (name, email, password) =>
    db
        .prepare('INSERT INTO user (name, email, password) VALUES (?,?,?)')
        .run(name, email, password);
export const updateUser = (id, name, email, password) =>
    db
        .prepare('UPDATE user SET name = ?, email = ?, password = ?, WHERE id = ?')
        .run(name, email, password, id);
export const deleteUser = (id) => db.prepare('DELETE FROM user WHERE id = ?').run(id);

