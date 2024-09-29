function ShowBasic_Info() {
    let name = "Komócsin Bence";
    let age = 17;
    let height = 1.72;
    let married = false;

    document.getElementById("basic_infoDiv").innerHTML = `Name: ${name}<br>Age: ${age}<br>Height: ${height}<br>Married: ${married}`;
}

function ShowAnimalsLegs() {
    let chickenNumber = document.getElementById("chicken").value;
    let pigNumber = document.getElementById("pig").value;

    let legs = (chickenNumber * 2) + (pigNumber * 4);

    document.getElementById("animalsLegs").innerHTML = `Legs: ${legs}`;
}

function CalculateBMI() {
    let mass_in_kg = 81.2;
    let height_in_m = 1.78;

    let bmi = mass_in_kg / (height_in_m * height_in_m);

    document.getElementById("bmi").innerHTML = `bmi: ${bmi.toFixed(2)}`;
}

function ShowCodingHours() {
    let semesterHours = 6 * 5 * 17;
    let weeklyHours = 6 * 5;

    let percentage = (weeklyHours / 52) * 100;

    document.getElementById("codingHours").innerHTML = `Hours spent with coding in a semester: ${semesterHours}<br>Hours spent with coding in a week: ${weeklyHours}<br>Percentage of average weekly hours: ${percentage.toFixed(2)}`;
}

function ShowSAandV() {
    let a = 10.4;
    let b = 13.5;
    let c = 8.2;

    let surfaceArea = 2 * ((a * b) + (a * c) + (b * c));
    let volume = a * b * c;

    document.getElementById("cuboid").innerHTML = `Surface area: ${surfaceArea}<br>Volume: ${volume}`;
}

function ShowFavNum() {
    let num = 7;

    document.getElementById("favnum").innerHTML = `Fav num: ${num}`;
}

function GreetOthers() {
    let name1 = "Aladár";
    let name2 = "Béla";
    let name3 = "Cecil";

    document.getElementById("greetings").innerHTML = `Hello, ${name1}<br>Hello, ${name2}<br>Hello, ${name3}`
}

function GreetUser() {
    let name = document.getElementById("name").value;

    document.getElementById("greetme").innerHTML = `Hello, ${name}`;
}

function HumptyD() {
    let text1 = "All the king's horses and all the king's men";
    let text2 = "Humpty Dumpty had a great fall.";
    let text3 = "Humpty Dumpty sat on a wall,";
    let text4 = "Couldn't put Humpty together again.";

    document.getElementById("humpty").innerHTML = `${text3}<br>${text2}<br>${text1}<br>${text4}`
}

function Myself() {
    let name = "Komócsin Bence";
    let age = 17;
    let height = 1.72;

    let text = `${name}\n${age}\n${height}`;

    console.log(text);
}

function ShowKM() {
    let miles = document.getElementById("miles").value;
    let km = miles * 1.6;

    document.getElementById("showkm").innerHTML = `The distance is: ${km.toFixed(2)}`;
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

function Calculations() {
    let a = 13;
    let b = 22;

    document.getElementById("showOperations").innerHTML = `${a + b}<br>${a - b}<br>${a * b}<br>${22 / 13}<br>${22 % 13}`;
}

function VarMutation() {
    let a = 3;
    a += 10;

    let b = 100;
    b -= 7;

    let c = 44;
    c *= 2;

    let d = 125;
    d /= 5;

    let e = 8;
    let cubedE = Math.pow(e, 3);

    let f1 = 123;
    let f2 = 345;

    let isF1greaterThanF2 = f1 > f2 ? true : false;

    let g1 = 350;
    let g2 = 200;
    let isDoubleG2greaterThanG1 = g2 * 2 > g1 ? true : false;

    let h = 136020258;
    let isHhas11AsDivisor = h % 11 == 0 ? true : false;

    let i1 = 10;
    let i2 = 3;
    let i1biggerSquaredSmallerCubed = i1 > Math.pow(i2, 2) && i1<Math.pow(i2, 3) ? true : false;

    let j = 1521;
    let isDivisibleBy3or5 = j%3==0 || j%5==0 ? true : false;
}