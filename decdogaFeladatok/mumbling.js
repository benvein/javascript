import input from './input.js';

let s = await input("text: ");

function accum(s) {
    return s
        .split('') 
        .map((char, index) => {
            // For each character, repeat it (index + 1) times and capitalize the first letter
            return char.toUpperCase() + char.toLowerCase().repeat(index);
        })
        .join('-'); // Join the array back into a string with '-' as the separator
}

console.log(accum(s));