import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../data/database.sqlite");
const db = new Database(dbPath);

// Enable foreign key constraints
db.pragma('foreign_keys = ON');

db.prepare(`CREATE TABLE IF NOT EXISTS bills
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    sellerId INTEGER NOT NULL,
    buyerId INTEGER NOT NULL,
    billNumber TEXT NOT NULL,
    date DATE NOT NULL,
    dateOfCompletion DATE NOT NULL,
    dueDate DATE NOT NULL,
    totalAmount INTEGER NOT NULL,
    tax INTEGER NOT NULL,
    FOREIGN KEY (sellerId) REFERENCES sellers(id),
    FOREIGN KEY (buyerId) REFERENCES buyers(id)
    );`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS sellers
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    taxNumber TEXT NOT NULL
    );`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS buyers
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    taxNumber TEXT NOT NULL
    );`).run();

export const getBills = () => db.prepare(`SELECT * FROM bills`).all();

export const getBill = (id) => db.prepare(`SELECT * FROM bills WHERE id = ?`).get(id);

export const saveBill = (sellerId, buyerId, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax) =>
    db.prepare(`INSERT INTO bills (sellerId, buyerId, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax) VALUES (?,?,?,?,?,?,?,?)`).run(sellerId, buyerId, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax);

export const updateBill = (id, sellerId, buyerId, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax) => 
    db.prepare(`UPDATE bills SET sellerId = ?, buyerId = ?, billNumber = ?, date = ?, dateOfCompletion = ?, dueDate = ?, totalAmount = ?, tax = ? WHERE id = ?`).run(sellerId, buyerId, billNumber, date, dateOfCompletion, dueDate, totalAmount, tax, id);

export const deleteBill = (id) => db.prepare(`DELETE FROM bills WHERE id = ?`).run(id);

export const getBuyers = () => db.prepare(`SELECT * FROM buyers`).all();

export const getBuyer = (id) => db.prepare(`SELECT * FROM buyers WHERE id = ?`).get(id);

export const saveBuyer = (name, taxNumber) =>
    db.prepare(`INSERT INTO buyers (name, taxNumber) VALUES (?, ?)`).run(name, taxNumber);

export const updateBuyer = (id, name, taxNumber) =>
    db.prepare(`UPDATE buyers SET name = ?, taxNumber = ? WHERE id = ?`).run(name, taxNumber, id);

export const deleteBuyer = (id) => db.prepare(`DELETE FROM buyers WHERE id = ?`).run(id);

export const getSellers = () => db.prepare(`SELECT * FROM sellers`).all();

export const getSeller = (id) => db.prepare(`SELECT * FROM sellers WHERE id = ?`).get(id);

export const saveSeller = (name, taxNumber) =>
    db.prepare(`INSERT INTO sellers (name, taxNumber) VALUES (?, ?)`).run(name, taxNumber);

export const updateSeller = (id, name, taxNumber) =>
    db.prepare(`UPDATE sellers SET name = ?, taxNumber = ? WHERE id = ?`).run(name, taxNumber, id);

export const deleteSeller = (id) => db.prepare(`DELETE FROM sellers WHERE id = ?`).run(id);
