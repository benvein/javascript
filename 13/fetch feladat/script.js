document.addEventListener('DOMContentLoaded', () => {
    const methodSelect = document.getElementById('method');
    const inputContainer = document.getElementById('input-container');
    const fetchBtn = document.getElementById('fetch-btn');
    const jokeDisplay = document.getElementById('joke-display');

    // Update input container based on method
    methodSelect.addEventListener('change', updateInputContainer);

    // Initial update
    updateInputContainer();

    // Fetch joke on button click
    fetchBtn.addEventListener('click', fetchJoke);

    function updateInputContainer() {
        const method = methodSelect.value;
        inputContainer.innerHTML = '';
        if (method === 'id') {
            inputContainer.innerHTML = '<label for="joke-id">Joke ID:</label><input type="number" id="joke-id" min="1" placeholder="Enter ID">';
        } else if (method === 'type') {
            inputContainer.innerHTML = `
                <label for="joke-type">Category:</label>
                <select id="joke-type">
                    <option value="Any">Any</option>
                    <option value="Programming">Programming</option>
                    <option value="Misc">Misc</option>
                    <option value="Dark">Dark</option>
                    <option value="Pun">Pun</option>
                    <option value="Spooky">Spooky</option>
                    <option value="Christmas">Christmas</option>
                </select>
            `;
        }
    }

    async function fetchJoke() {
        const method = methodSelect.value;
        let url = 'https://v2.jokeapi.dev/joke/';

        if (method === 'id') {
            const id = document.getElementById('joke-id').value;
            if (!id) {
                alert('Please enter a valid ID.');
                return;
            }
            url += `Any?id=${id}`;
        } else if (method === 'type') {
            const type = document.getElementById('joke-type').value;
            url += type;
        } else {
            url += 'Any';
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }
            const data = await response.json();
            displayJoke(data);
        } catch (error) {
            jokeDisplay.innerHTML = '<p>Error fetching joke. Please try again.</p>';
            console.error(error);
        }
    }

    function displayJoke(data) {
        if (data.type === 'single') {
            jokeDisplay.innerHTML = `<p>${data.joke}</p>`;
        } else if (data.type === 'twopart') {
            jokeDisplay.innerHTML = `<p><strong>Setup:</strong> ${data.setup}</p><p><strong>Delivery:</strong> ${data.delivery}</p>`;
        } else {
            jokeDisplay.innerHTML = '<p>Unexpected joke format.</p>';
        }
    }
});
