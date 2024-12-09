import input from "./input.js";

let text = await input("szoveg: ");

function isIsogram(text){
    text = text.toLowerCase();

    for (let i = 0; i < text.length; i++) {
        for (let j = i+1; j < text.length; j++) {
            if(text[i] === text[j]){
                return false;
            }
        }
    }

    return true;
}

console.log(isIsogram(text));