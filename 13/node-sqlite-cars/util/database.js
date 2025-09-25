import Database from 'better-sqlite3';

const db = new Database('./data/database.sqlite');

db.prepare(
    'CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY AUTOINCREMENT, brand STRING, model STRING)',
).run();

export const getCars = () => db.prepare('SELECT * FROM cars').all();

export const getCar = (id) => db.prepare('SELECT * FROM cars WHERE id = ?').get(id);

export const createCar = (brand, model) =>
    db.prepare('INSERT INTO cars (brand, model) VALUES(? ,?)').run(brand, model);

export const updateCar = (id, brand, model) =>
    db.prepare('UPDATE cars SET brand = ?, model = ?, WHERE id = ?').run(brand, model, id);

export const deleteCar = (id) => db.prepare('DELETE FROM cars WHERE id = ?').run(id);

const cars = getCars();
if (!cars.length) {
    createCar('Skoda', 'Octavia');
    createCar('Toyota', 'Camry');
    createCar('Ford', 'Focus');
    createCar('Wartburg', '353');
}
