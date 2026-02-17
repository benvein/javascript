-- Adatbázis létrehozása
CREATE DATABASE IF NOT EXISTS konyvtar
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE konyvtar;

-- Tábla törlése ha már létezik
DROP TABLE IF EXISTS konyvek;

-- Tábla létrehozása
CREATE TABLE konyvek (
    azon INT PRIMARY KEY,
    cim VARCHAR(255) NOT NULL,
    szerzo VARCHAR(255) NOT NULL,
    mufaj ENUM('regeny','vers','drama','mese') NOT NULL,
    eladas INT NOT NULL,
    ev INT NOT NULL
);

-- Adatok beszúrása
INSERT INTO konyvek (azon, cim, szerzo, mufaj, eladas, ev) VALUES
(1, 'Pride and Prejudice', 'Jane Austen', 'regeny', 1200000, 1813),
(2, 'Hamlet', 'William Shakespeare', 'drama', 1500000, 1603),
(3, 'Oliver Twist', 'Charles Dickens', 'regeny', 980000, 1838),
(4, '1984', 'George Orwell', 'regeny', 2000000, 1949),
(5, 'Animal Farm', 'George Orwell', 'regeny', 1750000, 1945),
(6, 'The Hobbit', 'J.R.R. Tolkien', 'regeny', 2100000, 1937),
(7, 'Romeo and Juliet', 'William Shakespeare', 'drama', 1400000, 1597),
(8, 'Great Expectations', 'Charles Dickens', 'regeny', 870000, 1861),
(9, 'The Old Man and the Sea', 'Ernest Hemingway', 'regeny', 760000, 1952),
(10, 'The Raven', 'Edgar Allan Poe', 'vers', 650000, 1845),
(11, 'Alice''s Adventures in Wonderland', 'Lewis Carroll', 'mese', 1100000, 1865),
(12, 'Wuthering Heights', 'Emily Brontë', 'regeny', 830000, 1847),
(13, 'Macbeth', 'William Shakespeare', 'drama', 1300000, 1606),
(14, 'The Picture of Dorian Gray', 'Oscar Wilde', 'regeny', 720000, 1890),
(15, 'The Jungle Book', 'Rudyard Kipling', 'mese', 900000, 1894);