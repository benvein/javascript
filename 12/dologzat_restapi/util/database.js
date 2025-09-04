import Database from "better-sqlite3";

const db = new Database("./data/database.sqlite")

db.prepare("CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, author STRING)").run();

export const getAllBooks = () => db.prepare("SELECT * FROM books").all();
export const getBook = (id) => db.prepare("SELECT * FROM books WHERE id = ?").get(id);
export const saveBook = (title, author) => db.prepare("INSERT INTO books (title, author) VALUES (?,?)").run(title, author);
export const deleteBook = (id) => db.prepare("DELETE FROM books WHERE id = ?").run(id);

const books = [
    {title: "t1", author: "a1"},
    {title: "t2", author: "a2"},
    {title: "t3", author: "a3"},
    {title: "t4", author: "a4"},
]

//for(const book of books) saveBook(book.title, book.author);