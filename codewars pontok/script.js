document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = document.getElementById('userId').value; // ID mező
    fetchUserData(userId); // Hívás módosítása
});

function fetchUserData(userId) { // Függvény neve
    const url = `https://api.allorigins.win/get?url=https://codewars.com/api/v1/users/${userId}`; // Alternatív CORS proxy használata
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const userData = JSON.parse(data.contents); // JSON parse a proxy válaszából
            displayUserData(userData); // Hívás módosítása
        })
        .catch(error => console.error('Fetch error:', error)); // Hiba kezelése
}

function displayUserData(data) { // Függvény neve
    const userDataContainer = document.getElementById('userData');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h2>${data.username}</h2>
        <p><strong>Név:</strong> ${data.name}</p>
        <p><strong>Klan:</strong> ${data.clan}</p>
        <p><strong>Nyelvek:</strong> ${data.languages.join(', ')}</p>
        <p><strong>JavaScript:</strong> ${data.ranks.languages.javascript.name}</p>
        <p><strong>Rang:</strong> ${data.ranks.overall.name}</p>
    `;
    userDataContainer.appendChild(card);
}