document.getElementById("dataForm").addEventListener("submit", function (e) {
  e.preventDefault();
});

let name = document.getElementById("name").value;
let postalCode = document.getElementById("postalcode").value;
let city = document.getElementById("city").value;
let street = document.getElementById("street").value;
let housenum = document.getElementById("housenum").value;

const data = {
  name,
  postalCode,
  city,
  street,
  housenum,
};

localStorage.setItem("data", JSON.stringify({ data }));

let savedData = JSON.parse(localStorage.getItem("data"));
