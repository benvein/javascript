document.addEventListener('DOMContentLoaded', () => {
    const blogListSection = document.getElementById('blog-list-section');
    const blogList = document.getElementById('blog-list');
    const addBlogButton = document.getElementById('add-blog-button');

    const blogDetailSection = document.getElementById('blog-detail-section');
    const blogDetail = document.getElementById('blog-detail');
    const editBlogButton = document.getElementById('edit-blog-button');
    const deleteBlogButton = document.getElementById('delete-blog-button');
    const backToListButton = document.getElementById('back-to-list-button');

    const blogFormSection = document.getElementById('blog-form-section');
    const blogForm = document.getElementById('blog-form');
    const formTitle = document.getElementById('form-title');
    const saveBlogButton = document.getElementById('save-blog-button');
    const cancelButton = document.getElementById('cancel-button');

    let currentBlogId = null;
    let isEditing = false;

    let users = [];

    const publisherSelect = blogForm.publisher;
    const newPublisherInput = document.getElementById('new-publisher');
    const addPublisherButton = document.getElementById('add-publisher-button');

    async function fetchPublishers() {
        try {
            const response = await fetch('/publishers');
            if (!response.ok) throw new Error('Failed to fetch publishers');
            users = await response.json();
            populateUserSelect();
        } catch (error) {
            alert(error.message);
        }
    }

    function populateUserSelect() {
        while (publisherSelect.options.length > 1) {
            publisherSelect.remove(1);
        }
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            publisherSelect.appendChild(option);
        });
    }

    addPublisherButton.addEventListener('click', async () => {
        const newPublisher = newPublisherInput.value.trim();
        if (newPublisher === '') {
            alert('Kérjük, adjon meg egy kiadó nevet.');
            return;
        }
        if (users.some(u => u.name === newPublisher)) {
            alert('Ez a kiadó már létezik.');
            return;
        }
        try {
            const response = await fetch('/publishers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newPublisher }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Hiba történt a kiadó hozzáadása során');
            }
            newPublisherInput.value = '';
            await fetchPublishers();
            publisherSelect.value = users.find(u => u.name === newPublisher).id;
        } catch (error) {
            alert(error.message);
        }
    });

    function formatDateForInput(dateStr) {
        const date = new Date(dateStr);
        if (isNaN(date)) return '';
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    function showSection(section) {
        blogListSection.classList.add('hidden');
        blogDetailSection.classList.add('hidden');
        blogFormSection.classList.add('hidden');
        section.classList.remove('hidden');
    }

    async function loadBlogList() {
        try {
            const response = await fetch('/blogs');
            if (!response.ok) throw new Error('Failed to fetch blogs');
            const blogs = await response.json();
            blogList.innerHTML = '';
            if (blogs.length === 0) {
                blogList.innerHTML = '<li>Nincsenek blogok.</li>';
                return;
            }
            blogs.forEach(blog => {
                const li = document.createElement('li');
                li.textContent = blog.title;
                li.dataset.id = blog.id;
                li.tabIndex = 0;
                li.classList.add('blog-list-item');
                li.addEventListener('click', () => showBlogDetail(blog.id));
                li.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        showBlogDetail(blog.id);
                    }
                });
                blogList.appendChild(li);
            });
            showSection(blogListSection);
        } catch (error) {
            alert(error.message);
        }
    }


    async function showBlogDetail(id) {
        try {
            const response = await fetch(`/blogs/${id}`);
            if (!response.ok) throw new Error('Blog nem található');
            const blog = await response.json();
            currentBlogId = id;
            blogDetail.innerHTML = `
                <p><strong>Kiadó:</strong> ${blog.publisherName}</p>
                <p><strong>Cím:</strong> ${blog.title}</p>
                <p><strong>Kategória:</strong> ${blog.category}</p>
                <p><strong>Tartalom:</strong> ${blog.content}</p>
                <p><strong>Dátum:</strong> ${new Date(blog.date).toLocaleString()}</p>
                <p><strong>Utolsó frissítés:</strong> ${new Date(blog.dateOfLastUpdate).toLocaleString()}</p>
            `;
            showSection(blogDetailSection);
        } catch (error) {
            alert(error.message);
        }
    }

    async function showAddBlogForm() {
        isEditing = false;
        currentBlogId = null;
        formTitle.textContent = 'Blog hozzáadása';
        blogForm.reset();
        await fetchPublishers();
        // Set date to current datetime-local string and make readonly with timezone offset adjustment
        const now = new Date();
        const tzoffset = now.getTimezoneOffset() * 60000; // offset in milliseconds
        const localISOTime = new Date(now - tzoffset).toISOString().slice(0,16);
        const dateInput = blogForm.querySelector('#date');
        dateInput.value = localISOTime;
        dateInput.readOnly = true;
        // Reset publisher select to placeholder
        publisherSelect.value = '';
        showSection(blogFormSection);
    }


    blogForm.date.addEventListener('change', () => {
        if (!isEditing) {
            // Removed blogForm.dateOfLastUpdate.value update
        }
    });

    async function showEditBlogForm() {
        if (!currentBlogId) return;
        try {
            const response = await fetch(`/blogs/${currentBlogId}`);
            if (!response.ok) throw new Error('Blog nem található');
            const blog = await response.json();
            isEditing = true;
            formTitle.textContent = 'Blog szerkesztése';
            populateUserSelect();
            publisherSelect.value = blog.publisherId;
            blogForm.title.value = blog.title;
            blogForm.category.value = blog.category;
            blogForm.content.value = blog.content;
            // Adjust date for timezone offset for datetime-local input
            const date = new Date(blog.date);
            const tzoffset = date.getTimezoneOffset() * 60000;
            const localISOTime = new Date(date - tzoffset).toISOString().slice(0,16);
            blogForm.date.value = localISOTime;
            blogForm.date.readOnly = true;
            showSection(blogFormSection);
        } catch (error) {
            alert(error.message);
        }
    }


    blogForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const blogData = {
            publisherId: parseInt(publisherSelect.value),
            title: blogForm.title.value.trim(),
            category: blogForm.category.value.trim(),
            content: blogForm.content.value.trim(),
            date: blogForm.date.value,
        };
        try {
            let response;
            if (isEditing && currentBlogId) {
                response = await fetch(`/blogs/${currentBlogId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blogData),
                });
            } else {
                response = await fetch('/blogs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blogData),
                });
            }
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Hiba történt a mentés során');
            }
            await loadBlogList();
        } catch (error) {
            alert(error.message);
            return;
        }
        showSection(blogListSection);
    });

    deleteBlogButton.addEventListener('click', async () => {
        if (!currentBlogId) return;
        if (!confirm('Biztosan törölni szeretnéd a blogot?')) return;
        try {
            const response = await fetch(`/blogs/${currentBlogId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Hiba történt a törlés során');
            }
            currentBlogId = null;
            await loadBlogList();
        } catch (error) {
            alert(error.message);
            return;
        }
        showSection(blogListSection);
    });

    addBlogButton.addEventListener('click', showAddBlogForm);
    editBlogButton.addEventListener('click', showEditBlogForm);
    backToListButton.addEventListener('click', () => {
        currentBlogId = null;
        showSection(blogListSection);
    });
    cancelButton.addEventListener('click', () => {
        if (currentBlogId) {
            showBlogDetail(currentBlogId);
        } else {
            showSection(blogListSection);
        }
    });

    loadBlogList();
});
