document.getElementById('dataForm').addEventListener('submit', function (e) {
    e.preventDefault();
});

function saveData() {
    var savedData = JSON.parse(localStorage.getItem('data'));
    let name = document.getElementById('name').value;
    let postalCode = parseInt(document.getElementById('postalcode').value);
    let city = document.getElementById('city').value;
    let street = document.getElementById('street').value;
    let housenum = document.getElementById('housenum').value;

    var data = {
        name,
        postalCode,
        city,
        street,
        housenum,
    };

    localStorage.setItem('data', JSON.stringify({ data }));
    console.log('data saved');
    console.log(savedData);
    console.log(savedData.name);
}

function showStuff() {
    var savedData = JSON.parse(localStorage.getItem('data'));
    if (savedData && savedData.data) {
        document.getElementById('showData').innerHTML =
            'nev: ' +
            savedData.data.name +
            '<br>irszam: ' +
            savedData.data.postalCode +
            '<br>varos: ' +
            savedData.data.city +
            '<br>kozterulet: ' +
            savedData.data.street +
            '<br>hsz:' +
            savedData.data.housenum +
            '<br>';
        document.getElementById('showData').style.display = 'block';
    } else {
        document.getElementById('showData').innerHTML = 'No data saved yet.';
        document.getElementById('showData').style.display = 'block';
    }
}
