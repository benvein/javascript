document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const timetableBody = document.querySelector('#timetable tbody');
    const addBtn = document.getElementById('addBtn');
    const modal = document.getElementById('entryModal');
    const closeBtn = document.querySelector('.close');
    const entryForm = document.getElementById('entryForm');
    const modalTitle = document.getElementById('modalTitle');
    const entryIdInput = document.getElementById('entryId');

    // Initialize timetable with empty periods
    const periods = 12;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    // Create empty timetable structure
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

    // Fetch timetable data from backend
    async function fetchTimetable() {
        try {
            const response = await fetch('http://localhost:3000/timetable');
            if (!response.ok) throw new Error('Failed to fetch timetable');
            const data = await response.json();
            populateTimetable(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to load timetable data');
        }
    }

    // Populate timetable with data
    function populateTimetable(entries) {
        createEmptyTimetable();
        
        entries.forEach(entry => {
            const cell = document.querySelector(`td[data-day="${entry.day}"][data-period="${entry.period}"]`);
            if (cell) {
                cell.innerHTML = `
                    ${entry.subject}
                    <div class="actions">
                        <button class="edit-btn" data-id="${entry.id}">Edit</button>
                        <button class="delete-btn" data-id="${entry.id}">Delete</button>
                    </div>
                `;
            }
        });

        // Add event listeners to action buttons
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

    // Open modal for adding new entry
    addBtn.addEventListener('click', () => {
        entryIdInput.value = '';
        entryForm.reset();
        modalTitle.textContent = 'Add New Timetable Entry';
        modal.style.display = 'block';
    });

    // Close modal
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = 'none';
    });

    // Handle form submission
    entryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            day: document.getElementById('day').value,
            period: document.getElementById('period').value,
            subject: document.getElementById('subject').value
        };

        try {
            let response;
            const id = entryIdInput.value;
            
            if (id) {
                // Update existing entry
                response = await fetch(`http://localhost:3000/timetable/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            } else {
                // Create new entry
                response = await fetch('http://localhost:3000/timetable', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            }

            if (!response.ok) throw new Error('Failed to save entry');
            
            modal.style.display = 'none';
            fetchTimetable();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save timetable entry');
        }
    });

    // Edit entry
    async function editEntry(id) {
        try {
            const response = await fetch(`http://localhost:3000/timetable/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch timetable entry');
            }
            const entry = await response.json();
    
            // Populate the modal form with the fetched data
            entryIdInput.value = entry.id;
            document.getElementById('day').value = entry.day;
            document.getElementById('period').value = entry.period;
            document.getElementById('subject').value = entry.subject;
    
            modalTitle.textContent = 'Edit Timetable Entry';
            modal.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to load entry for editing');
        }
    }

    // Delete entry
    async function deleteEntry(id) {
        if (!confirm('Are you sure you want to delete this entry?')) return;
        
        try {
            const response = await fetch(`http://localhost:3000/timetable/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete entry');
            fetchTimetable();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete timetable entry');
        }
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initialize the app
    createEmptyTimetable();
    fetchTimetable();
});
