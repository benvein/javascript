const bcrypt = require('bcrypt');
const { app, sessions, requireAuth } = require('./server');
const { userQueries, projectQueries, taskQueries } = require('./database');

app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email és jelszó kötelező' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const result = userQueries.create.run(email, passwordHash);

        res.json({ id: result.lastInsertRowid, email });
    } catch (error) {
        if (error.message.includes('UNIQUE')) {
            res.status(400).json({ error: 'Ez az email cím már regisztrálva van' });
        } else {
            res.status(500).json({ error: 'Regisztráció sikertelen' });
        }
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = userQueries.findByEmail.get(email);

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ error: 'Hibás email vagy jelszó' });
        }

        const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
        sessions.set(token, user.id);

        res.json({ token, userId: user.id, email: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Bejelentkezés sikertelen' });
    }
});

app.post('/api/logout', requireAuth, (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    sessions.delete(token);
    res.json({ message: 'Sikeres kijelentkezés' });
});

app.get('/api/projects', requireAuth, (req, res) => {
    try {
        const projects = projectQueries.findByOwner.all(req.userId);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Projektek betöltése sikertelen' });
    }
});

app.post('/api/projects', requireAuth, (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Projekt név kötelező' });
        }

        const result = projectQueries.create.run(name, description || '', req.userId);
        const project = projectQueries.findById.get(result.lastInsertRowid);

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Projekt létrehozása sikertelen' });
    }
});

app.get('/api/projects/:id/tasks', requireAuth, (req, res) => {
    try {
        const { id } = req.params;

        const project = projectQueries.checkOwnership.get(id, req.userId);

        if (!project) {
            return res.status(403).json({ error: 'Nincs jogosultság ehhez a projekthez' });
        }

        const tasks = taskQueries.findByProject.all(id);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Task-ok betöltése sikertelen' });
    }
});

app.post('/api/projects/:id/tasks', requireAuth, (req, res) => {
    try {
        const { id } = req.params;
        const { title, assignee_id, due_date } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Task cím kötelező' });
        }

        const project = projectQueries.checkOwnership.get(id, req.userId);

        if (!project) {
            return res.status(403).json({ error: 'Nincs jogosultság ehhez a projekthez' });
        }

        const result = taskQueries.create.run(id, title, assignee_id || null, due_date || null);

        const task = taskQueries.findById.get(result.lastInsertRowid);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Task létrehozása sikertelen' });
    }
});

app.put('/api/tasks/:id', requireAuth, (req, res) => {
    try {
        const { id } = req.params;
        const { status, assignee_id, title, due_date } = req.body;

        const task = taskQueries.checkAccess.get(id, req.userId);

        if (!task) {
            return res.status(403).json({ error: 'Nincs jogosultság ehhez a taskhoz' });
        }

        const newStatus = status !== undefined ? status : task.status;
        const newAssigneeId = assignee_id !== undefined ? assignee_id : task.assignee_id;
        const newTitle = title !== undefined ? title : task.title;
        const newDueDate = due_date !== undefined ? due_date : task.due_date;

        taskQueries.update.run(newStatus, newAssigneeId, newTitle, newDueDate, id);

        const updatedTask = taskQueries.findById.get(id);
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Task módosítása sikertelen' });
    }
});

app.get('/api/users', requireAuth, (req, res) => {
    try {
        const users = userQueries.getAll.all();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Felhasználók betöltése sikertelen' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Team Tasks szerver fut: http://localhost:${PORT}`);
    console.log(`📁 Adatbázis: teamtasks.db`);
});
