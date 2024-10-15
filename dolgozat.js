import input from  './input.js'

function averageOfDigits(num){
    let digits = num.toString();
    let sum = 0;
    for(let i = 0;  i < num.length; i++){
        sum += parseInt(digits[i], 10)
    }
    return sum/num.length();
    
}

function gradeCalculator(pontszam, maxPontszam){
    let szazalek = (pontszam/maxpontszam)*100;

    if(szazalek>=90){
        return "A";
    }
    else if(szazalek>=80 && szazalek <90){
        return  "B";
    }
    else if(szazalek>=70 && szazalek <80){
        return "C";
    }
    else if(szazalek>=60 && szazalek <70){
        return "D";
    }
    else if(szazalek>=50 && szazalek <60){
        return "E";
    }
    else{
        return "F"
    }
    
}

function seconds(time) {
    let secondsInAday = 24*60*60;
    let timeNow = time.split(':');

    
}

function threeRuls() {
    let count = 0;
    for (let i = 1; i <= 50; i++) {
        if(i%3==0){
            count++;
        }
        if(i%count == 1 || i%count == 2){
            console.log(i);
        }
        
    }
}