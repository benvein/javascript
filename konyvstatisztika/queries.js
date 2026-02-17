import db from "./data/db.js";

export const getBySalesAmountHigher = (eladas) => db.prepare("SELECT cim, szerzo FROM konyvek WHERE eladas > ?").all(eladas);
export const getCountGroupedByCategory = () => db.prepare("SELECT mufaj, COUNT(*) AS darabszam FROM konyvek GROUP BY mufaj").all();
export const getByAuthor = (szerzo) => db.prepare("SELECT cim, eladas FROM konyvek WHERE szerzo = ?").all(szerzo);
export const madeBeforeYear = (ev) => db.prepare("SELECT cim, ev FROM konyvek WHERE ev < ?").all(ev);
export const authorsWithAtLeastAmountBooks = (szam) => db.prepare("SELECT szerzo, COUNT(*) AS darabszam FROM konyvek WHERE darabszam >= ? GROUP BY szerzo").all(szam);
