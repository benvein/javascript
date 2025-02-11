import input from '../input.js' 

let num = await input("szám: ");
let text = "jigouzhgeriu";



function fizzBuzz(num){
    let array =  [];

    for (let i = 1; i < num; i++) {
        array.push(i);
        if(array[i]%3==0 && array[i]%5==0){
            array[i] = "FizzBuzz"
        }   
        else if(array[i]%3==0 && array[i]%5!=0){
            array[i] = "Fizz";
        } 
        else if(array[i]%3!=0 && array[i]%5==0){
            array[i] = "Buzz";
        }
        
    }
    return array;
}

fizzBuzz(num)


function myParseInt(num){

}

myParseInt(num)


let p1 = await input("elso jatekos [1: kő, 2: papír, 3: olló]: ");
let p2 = await input("masodik jatekos [1: kő, 2: papír, 3: olló]: ");

function rockPaperScissors(p1,p2){
    let message = "";
    if((p1 == "1"  && p2 == "2")||(p1 == "2" && p2 == "3")||(p1 == "3" && p2 == "1")){
        message = "p2 nyert";
    }
    else if((p1 == "2"  && p2 == "1")||(p1 == "3" && p2 == "2")||(p1 == "1" && p2 == "3")){
        message = "p1 nyert";
    }
    else{
        message = "dontetlen"
    }
    return message;
}

rockPaperScissors(p1,p2)

function removeVowel(text){
    let vowelArray =  ["a", "e", "i", "o", "u"];
    let result = "";
    let newText = [];

    for (let i = 0; i < text.length; i++) {
        if(!vowelArray.includes(i)){
            newText.push(i);
        }
        
    }
    result +=  newText.join("");

    return result;
}

removeVowel(text)