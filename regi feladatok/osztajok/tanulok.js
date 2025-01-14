import input from './input.js'

class Student{
    constructor(name, email){
        this.name = name;
        this.email = email;
    }
    kiir(){
        console.log(`név: ${this.name}, email: ${this.email}`)
    }
}

let number = await input("hány diák?: ");
let i = 1;
let array = [];

while(i <= number){
    let student = await input("tanulo azonosizo: ");
    let name = await input("Név: ");
    let email = await input("Email: ");
    student = new Student(name, email);
    array.push(student);
    i++;
}

for (var stud of array){
    stud.kiir();
}