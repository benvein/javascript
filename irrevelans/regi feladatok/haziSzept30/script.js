function CalculateBMI() {
    let mass_in_kg = 81.2;
    let height_in_m = 1.78;

    let bmi = mass_in_kg / (height_in_m * height_in_m);

    document.getElementById("bmi").innerHTML = `bmi: ${bmi.toFixed(2)}`;
}

function ShowSAandV() {
    let a = 10.4;
    let b = 13.5;
    let c = 8.2;

    let surfaceArea = 2 * ((a * b) + (a * c) + (b * c));
    let volume = a * b * c;

    document.getElementById("cuboid").innerHTML = `Surface area: ${surfaceArea}<br>Volume: ${volume}`;
}
function RemainingSeconds() {
    let currentH = 13;
    let currentMin = 34;
    let currentSec = 42;

    let currentInSec = (currentH * 60 * 60) + (currentMin * 60) + currentSec;

    let secInAday = 24 * 60 * 60;

    let remainingSec = secInAday - currentInSec;

    document.getElementById("remaining").innerHTML = `Remaining: ${remainingSec}`;
}

function AppleDarabol(){
    let alma = 'apple';

   
}