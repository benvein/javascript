import db from './data/db.js';

export const getStudentsByCity = (telepules) =>
    db.prepare('SELECT nev FROM diakok WHERE telepules = ?').all(telepules);

export const getEnglishClasses = () =>
    db
        .prepare(
            "SELECT datum, terem, orasorszam FROM orak WHERE targy = 'angol' ORDER BY datum, orasorszam",
        )
        .all();

export const getMathsAndPhysicsClassesIn9thGrade = () =>
    db
        .prepare(
            "SELECT csoport, targy, datum FROM orak WHERE csoport LIKE '9%' AND (targy = 'matematika' OR targy = 'FIZIKA') ORDER BY targy",
        )
        .all();

export const getStudentCountByCity = () =>
    db.prepare('SELECT COUNT(*) AS diakCount FROM diakok GROUP BY telepules').run();

export const getSubjects = () =>
    db.prepare('SELECT DISTINCT(targy) FROM orak GROUP BY targy').all();

export const getRegisteredStudentsByTeacherAndDate = (nev, datum) =>
    db
        .prepare(
            `SELECT d.nev, d.email, d.telefon
         FROM regisztraciok r
         JOIN orak o ON r.ora_id = o.id
         JOIN diakok d ON r.diak_id = d.id
         WHERE o.tanar = ? AND o.datum = ?
         ORDER BY d.nev`,
        )
        .all(nev, datum);

export const getStudentsFromSameCityExcept = (nev) =>
    db
        .prepare(
            `SELECT nev
             FROM diakok
             WHERE telepules = (
                 SELECT telepules FROM diakok WHERE nev = ?
             ) AND nev != ?
             ORDER BY nev`,
        )
        .all(nev, nev);
