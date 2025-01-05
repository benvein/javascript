document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = document.getElementById('userId').value; 
    fetchUserData(userId); 
});

function fetchUserData(userId) { 
    const url = `https://api.allorigins.win/get?url=https://codewars.com/api/v1/users/${userId}`;
    fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(user => {
    console.log(user);
    displayUserData(user);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function displayUserData(data){
  const userDataContainer = document.getElementById('userData');
  const card = document.createElement('div');
  card.className = 'card';

  if (!data || data.success === false) {
      card.innerHTML = `<p>No user data found. Reason: ${data.reason || 'Unknown'}</p>`;
      userDataContainer.appendChild(card);
      return;
  }

  const languages = data.languages && Array.isArray(data.languages) ? data.languages.join(', ') : 'N/A';
  const javascriptRank = data.ranks?.languages?.javascript?.name || 'N/A';
  const overallRank = data.ranks?.overall?.name || 'N/A';

  card.innerHTML = `
      <h2>${data.username ||  'N/A' }</h2>
      <p><strong>Név:</strong> ${data.name || 'N/A'}</p>
      <p><strong>Klan:</strong> ${data.clan || 'N/A'}</p>
      <p><strong>Nyelvek:</strong> ${languages}</p>
      <p><strong>JavaScript:</strong> ${javascriptRank}</p>
      <p><strong>Rang:</strong> ${overallRank}</p>
  `;
  userDataContainer.appendChild(card);
}