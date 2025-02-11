function fetching(id){
    fetch(`https://jsonplaceholder.org/users/?id=${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(user => {
    console.log(user);
    megjelenites(user);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function megjelenites(adatok){
    document.getElementById("id").textContent = adatok.id;
    document.getElementById("nev").textContent = [adatok.firstname, adatok.lastname].join(" ");
    document.getElementById("telefon").textContent = adatok.phone;
    document.getElementById("email").textContent = adatok.email;
    document.getElementById("cim").textContent = adatok.address.zipcode + " " + adatok.address.city + " " + adatok.address.street + " " + adatok.address.suite;
    document.getElementById("geo").textContent = adatok.address.geo.lat + "; " + adatok.address.geo.lng;
    document.getElementById("cegadat").textContent = adatok.company.name + " " + adatok.company.catchPhrase + " " + adatok.company.bs
}

function kereses(){
    id = document.getElementById("userID").value
    fetching(id);
}