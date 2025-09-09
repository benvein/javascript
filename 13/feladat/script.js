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
    return (document.getElementById('showData').innerHTML =
        'nev: ' +
        savedData.name +
        '<br>irszam: ' +
        savedData.postalCode +
        '<br>varos: ' +
        savedData.city +
        '<br>kozterulet: ' +
        savedData.city +
        '<br>hsz:' +
        savedData.housenum +
        '<br>');
}
