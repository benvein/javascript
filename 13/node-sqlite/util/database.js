import Database from 'better-sqlite3';

const db = new Database('./data/database.sqlite');

db.prepare(
    'CREATE TABLE IS NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, author STRING)',
).run();

export const getBooks = () => db.prepare('SELECT * FROM books').all();
export const getBookById = (id) => db.prepare('SELECT * FROM books WHERE id = ?').get(id);
export const saveBook = (title, author) =>
    db.prepare('INSERT INTO books (title. author) VALUES (?, ?)').run();
export const updateBooks = (id, title, author) =>
    db.prepare('UPDATE books SET title = ?, author = ?, WHERE id = ?').run(title, author, id);
export const deleteBookById = (id) => db.prepare('DELETE FROM books WHERE id = ?').run(id);

const books = getBooks();
if(!books.length){
    saveBook("Bible", "Rabbi Dildo");
    saveBook("Art of war", "Sun tzu");
    saveBook("Mein kampf", "Daddy H");
    saveBook("1984", "G. Orwell");
}