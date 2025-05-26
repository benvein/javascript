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
                <p><strong>Kiadó:</strong> ${blog.publisher}</p>
                <p><strong>Cím:</strong> ${blog.title}</p>
                <p><strong>Kategória:</strong> ${blog.category}</p>
                <p><strong>Tartalom:</strong> ${blog.content}</p>
                <p><strong>Dátum:</strong> ${new Date(blog.date).toLocaleDateString()}</p>
                <p><strong>Utolsó frissítés:</strong> ${new Date(blog.dateOfLastUpdate).toLocaleDateString()}</p>
            `;
            showSection(blogDetailSection);
        } catch (error) {
            alert(error.message);
        }
    }

    function showAddBlogForm() {
        isEditing = false;
        currentBlogId = null;
        formTitle.textContent = 'Blog hozzáadása';
        blogForm.reset();
        // Set date to today's date and disable editing
        const today = new Date().toISOString().split('T')[0];
        blogForm.date.value = today;
        blogForm.date.readOnly = true;
        blogForm.dateOfLastUpdate.value = today;
        showSection(blogFormSection);
    }

    blogForm.date.addEventListener('change', () => {
        if (!isEditing) {
            blogForm.dateOfLastUpdate.value = blogForm.date.value;
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
            blogForm.publisher.value = blog.publisher;
            blogForm.title.value = blog.title;
            blogForm.category.value = blog.category;
            blogForm.content.value = blog.content;
            blogForm.date.value = formatDateForInput(blog.date);
            showSection(blogFormSection);
        } catch (error) {
            alert(error.message);
        }
    }

    blogForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const blogData = {
            publisher: blogForm.publisher.value.trim(),
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
