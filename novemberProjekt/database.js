const Database = require('better-sqlite3');
const db = new Database('teamtasks.db');

// Adatbázis inicializálás
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    owner_id INTEGER NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    assignee_id INTEGER,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'Terv',
    due_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (assignee_id) REFERENCES users(id)
  );
`);

// User műveletek
const userQueries = {
  create: db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)'),
  findByEmail: db.prepare('SELECT * FROM users WHERE email = ?'),
  getAll: db.prepare('SELECT id, email FROM users')
};

// Project műveletek
const projectQueries = {
  create: db.prepare('INSERT INTO projects (name, description, owner_id) VALUES (?, ?, ?)'),
  findById: db.prepare('SELECT * FROM projects WHERE id = ?'),
  findByOwner: db.prepare(`
    SELECT p.*, u.email as owner_email,
      (SELECT COUNT(*) FROM tasks WHERE project_id = p.id) as task_count
    FROM projects p
    JOIN users u ON p.owner_id = u.id
    WHERE p.owner_id = ?
    ORDER BY p.id DESC
  `),
  checkOwnership: db.prepare('SELECT * FROM projects WHERE id = ? AND owner_id = ?')
};

// Task műveletek
const taskQueries = {
  create: db.prepare(`
    INSERT INTO tasks (project_id, title, assignee_id, due_date, status)
    VALUES (?, ?, ?, ?, 'Terv')
  `),
  findById: db.prepare(`
    SELECT t.*, u.email as assignee_email
    FROM tasks t
    LEFT JOIN users u ON t.assignee_id = u.id
    WHERE t.id = ?
  `),
  findByProject: db.prepare(`
    SELECT t.*, u.email as assignee_email
    FROM tasks t
    LEFT JOIN users u ON t.assignee_id = u.id
    WHERE t.project_id = ?
    ORDER BY t.created_at DESC
  `),
  update: db.prepare('UPDATE tasks SET status = ?, assignee_id = ?, title = ?, due_date = ? WHERE id = ?'),
  checkAccess: db.prepare(`
    SELECT t.* FROM tasks t
    JOIN projects p ON t.project_id = p.id
    WHERE t.id = ? AND p.owner_id = ?
  `)
};

module.exports = {
  db,
  userQueries,
  projectQueries,
  taskQueries
};