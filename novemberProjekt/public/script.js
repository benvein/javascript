let token = localStorage.getItem('token');
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
let currentProject = null;
let users = [];


if (token && currentUser) {
  showApp();
  loadProjects();
  loadUsers();
}

document.getElementById('loginPassword')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') login();
});

document.getElementById('registerPassword')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') register();
});

function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
  hideError();
}

function showLogin() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
  hideError();
}

async function register() {
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const data = await res.json();
      showError(data.error);
      return;
    }

    showLogin();
    showError('Sikeres regisztráció! Most jelentkezz be.', 'success');
  } catch (error) {
    showError('Hálózati hiba történt');
  }
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const data = await res.json();
      showError(data.error);
      return;
    }

    const data = await res.json();
    token = data.token;
    currentUser = { id: data.userId, email: data.email };
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(currentUser));

    showApp();
    loadProjects();
    loadUsers();
  } catch (error) {
    showError('Hálózati hiba történt');
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  token = null;
  currentUser = null;
  location.reload();
}

function showApp() {
  document.getElementById('authContainer').style.display = 'none';
  document.getElementById('appContainer').style.display = 'block';
  document.getElementById('userEmail').textContent = currentUser.email;
}

function showError(msg, type = 'error') {
  const el = document.getElementById('authError');
  el.textContent = msg;
  el.style.display = 'block';
  if (type === 'success') {
    el.style.background = '#e6ffe6';
    el.style.color = '#0c0';
  }
}

function hideError() {
  document.getElementById('authError').style.display = 'none';
}

async function loadProjects() {
  try {
    const res = await fetch('/api/projects', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const projects = await res.json();
    
    const list = document.getElementById('projectList');
    list.innerHTML = projects.map(p => `
      <div class="project-item ${currentProject?.id === p.id ? 'active' : ''}" 
           onclick="selectProject(${p.id})">
        <h3>${p.name}</h3>
        <p>${p.description || 'Nincs leírás'}</p>
        <div class="project-meta">
          <span>👤 ${p.owner_email}</span>
          <span>📋 ${p.task_count} task</span>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Projektek betöltése sikertelen', error);
  }
}

function showNewProjectModal() {
  document.getElementById('newProjectModal').classList.add('active');
}

async function createProject() {
  const name = document.getElementById('newProjectName').value;
  const description = document.getElementById('newProjectDescription').value;

  if (!name) return alert('Add meg a projekt nevét!');

  try {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, description })
    });

    if (res.ok) {
      closeModal('newProjectModal');
      document.getElementById('newProjectName').value = '';
      document.getElementById('newProjectDescription').value = '';
      loadProjects();
    }
  } catch (error) {
    alert('Projekt létrehozása sikertelen');
  }
}

async function selectProject(id) {
  const res = await fetch('/api/projects', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const projects = await res.json();
  currentProject = projects.find(p => p.id === id);
  
  loadProjects();
  loadTasks();
}

async function loadTasks() {
  if (!currentProject) return;

  document.getElementById('emptyBoard').style.display = 'none';
  document.getElementById('taskBoard').style.display = 'block';
  document.getElementById('projectName').textContent = currentProject.name;
  document.getElementById('projectDescription').textContent = currentProject.description || '';

  try {
    const res = await fetch(`/api/projects/${currentProject.id}/tasks`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const tasks = await res.json();

    const statuses = ['Terv', 'Folyamatban', 'Kész'];
    statuses.forEach(status => {
      const filtered = tasks.filter(t => t.status === status);
      const containerId = `tasks${status.replace(' ', '')}`;
      const countId = `count${status.replace(' ', '')}`;
      
      document.getElementById(countId).textContent = filtered.length;
      document.getElementById(containerId).innerHTML = filtered.map(t => createTaskCard(t)).join('');
    });
  } catch (error) {
    console.error('Task-ok betöltése sikertelen', error);
  }
}

function createTaskCard(task) {
  const otherStatuses = ['Terv', 'Folyamatban', 'Kész'].filter(s => s !== task.status);
  
  return `
    <div class="task-card">
      <div class="task-title">${task.title}</div>
      <div class="task-meta">
        ${task.assignee_email ? `<span class="task-assignee">👤 ${task.assignee_email}</span>` : '<span>-</span>'}
        ${task.due_date ? `<span class="task-due">📅 ${task.due_date}</span>` : ''}
      </div>
      <div class="task-actions">
        ${otherStatuses.map(s => `
          <button class="task-action-btn btn-move-${s.toLowerCase().replace(' ', '')}" 
                  onclick="moveTask(${task.id}, '${s}')">
            → ${s}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

async function moveTask(taskId, newStatus) {
  try {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (res.ok) {
      loadTasks();
    }
  } catch (error) {
    alert('Task módosítása sikertelen');
  }
}

async function loadUsers() {
  try {
    const res = await fetch('/api/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    users = await res.json();
  } catch (error) {
    console.error('Felhasználók betöltése sikertelen', error);
  }
}

function showNewTaskModal() {
  if (!currentProject) {
    return alert('Először válassz ki egy projektet!');
  }

  const select = document.getElementById('newTaskAssignee');
  select.innerHTML = '<option value="">-- Nincs kijelölve --</option>' +
    users.map(u => `<option value="${u.id}">${u.email}</option>`).join('');

  document.getElementById('newTaskModal').classList.add('active');
}

async function createTask() {
  const title = document.getElementById('newTaskTitle').value;
  const assignee_id = document.getElementById('newTaskAssignee').value;
  const due_date = document.getElementById('newTaskDueDate').value;

  if (!title) return alert('Add meg a task címét!');

  try {
    const res = await fetch(`/api/projects/${currentProject.id}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        assignee_id: assignee_id || null,
        due_date: due_date || null
      })
    });

    if (res.ok) {
      closeModal('newTaskModal');
      document.getElementById('newTaskTitle').value = '';
      document.getElementById('newTaskAssignee').value = '';
      document.getElementById('newTaskDueDate').value = '';
      loadTasks();
    }
  } catch (error) {
    alert('Task létrehozása sikertelen');
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}