import Database from "better-sqlite3";

const db = new Database("./data/konyvtar.sqlite");

export default db;