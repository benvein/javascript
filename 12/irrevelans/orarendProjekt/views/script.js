document.addEventListener('DOMContentLoaded', function() {
    const timetableBody = document.querySelector('#timetable tbody');
    const addBtn = document.getElementById('addBtn');
    const modal = document.getElementById('entryModal');
    const closeBtn = document.querySelector('.close');
    const entryForm = document.getElementById('entryForm');
    const modalTitle = document.getElementById('modalTitle');
    const entryIdInput = document.getElementById('entryId');

    const periods = 12;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    function createEmptyTimetable() {
        timetableBody.innerHTML = '';
        for (let period = 1; period <= periods; period++) {
            const row = document.createElement('tr');
            const periodCell = document.createElement('td');
            periodCell.textContent = period;
            row.appendChild(periodCell);

            days.forEach(day => {
                const cell = document.createElement('td');
                cell.dataset.day = day;
                cell.dataset.period = period;
                row.appendChild(cell);
            });

            timetableBody.appendChild(row);
        }
    }

    async function fetchTimetable() {
        try {
            const response = await fetch('http://localhost:3000/timetable');
            if (!response.ok) throw new Error('failed to fetch');
            const data = await response.json();
            console.log('Fetched timetable data:', data);
            await populateTimetable(data);
        } catch (error) {
            console.error('Error:', error);
            alert('failed to load');
        }
    }

    async function populateTimetable(entries) {
        createEmptyTimetable();
        console.log('Populating timetable with data:', entries);
    
        entries.forEach(entry => {
            const selector = `td[data-day="${entry.day}"][data-period="${entry.period}"]`;
            console.log('Selector:', selector);
            const cell = document.querySelector(selector);
            if (cell) {
                console.log(`Found cell for day: ${entry.day}, period: ${entry.period}`);
                cell.innerHTML = `
                    ${entry.subject}
                    <div class="actions">
                        <button class="edit-btn" data-id="${entry.id}">edit</button>
                        <button class="delete-btn" data-id="${entry.id}">delete</button>
                    </div>
                `;
            } else {
                console.warn(`No cell found for selector: ${selector}`);
            }
        });
    
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                editEntry(btn.dataset.id);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteEntry(btn.dataset.id);
            });
        });
    }
    

    addBtn.addEventListener('click', () => {
        entryIdInput.value = '';
        entryForm.reset();
        modalTitle.textContent = 'add new record';
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = 'none';
    });

    entryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            day: document.getElementById('day').value,
            period: parseInt(document.getElementById('period').value, 10),
            subject: document.getElementById('subject').value
        };

        try {
            let response;
            const id = entryIdInput.value;
            
            if (id) {
                response = await fetch(`http://localhost:3000/timetable/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            } else {
                response = await fetch('http://localhost:3000/timetable', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            }

            if (!response.ok) throw new Error('failed to save');
            
            modal.style.display = 'none';
            await fetchTimetable();
        } catch (error) {
            console.error('Error:', error);
            alert('failed to save');
        }
    });

    async function editEntry(id) {
        try {
            const response = await fetch(`http://localhost:3000/timetable/${id}`);
            if (!response.ok) {
                throw new Error('failed to fetch');
            }
            const entry = await response.json();
    
            // Populate the modal form with the fetched data
            entryIdInput.value = entry.id;
            document.getElementById('day').value = entry.day;
            document.getElementById('period').value = entry.period;
            document.getElementById('subject').value = entry.subject;
    
            modalTitle.textContent = 'edit record';
            modal.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            alert('failed to load for editing');
        }
    }

    async function deleteEntry(id) {
        if (!confirm('are you sure?')) return;
        
        try {
            const response = await fetch(`http://localhost:3000/timetable/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('failed to delete');
            await fetchTimetable();
        } catch (error) {
            console.error('Error:', error);
            alert('failed to delete');
        }
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    async function initializeTimetable() {
        createEmptyTimetable();
        await fetchTimetable();
    }
    
    initializeTimetable();
});
