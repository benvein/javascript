import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite');

db.prepare(`CREATE TABLE IF NOT EXISTS bills
    (id INTEGER PRIMARY KEY AUTOINCREMENT
    seller STRING NOT NULL
    buyer STRING NOT NULL
    billNumber STRING NOT NULL
    date DATE NOT NULL
    dateOfCompletion DATE NOT NULL
    dueDate DATE NOT NULL
    totalAmount INTEGER NOT NULL
    tax INTEGER NOT NULL
    )`).run();

export const getBills = () => db.prepare(`SELECT * FROM bills`).all();

export const getBill = (id) => db.prepare(`SELECT * FROM bills WHERE id = ?`).get(id);

export const saveBill = (seller, buyer, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax) =>
    db.prepare(`INSERT INTO bills (seller, buyer, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax) VALUES (?,?,?,?,?,?,?,?)`).run(seller, buyer, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax);

export const updateBill = (id, seller, buyer, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax) => 
    db.prepare(`UPDATE bills SET seller = ?, buyer = ?, billNumber = ?, date = ?, dateOfCompletion = ?, dueDate = ?, totalAmount = ?, tax = ? WHERE id = ?`).run(seller, buyer, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax, id);

export const deleteBill = (id) => db.prepare(`DELETE FROM bills WHERE id = ?`).run(id);