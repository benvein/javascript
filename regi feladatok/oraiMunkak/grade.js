import input from './input.js';

let grade = await input("jegy: ");

let letterGrade;

switch (grade){
    case '1':
        letterGrade = "F";
        break;
    case '2':
        letterGrade = "D";
        break;
    case '3':
        letterGrade = "C";
        break;
    case '4':
        letterGrade = "B";
        break;
    case '5':
        letterGrade = "A";
        break;
    default:
        letterGrade = "no";
}

console.log(letterGrade);