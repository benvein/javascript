import input from './input.js';

let text = await input("text: ");

function getMiddleCharacter(text) {
    const length = text.length;
    const midIndex = Math.floor(length / 2);

    if (length % 2 === 0) {
        // Even length: return the two middle characters
        return text[midIndex - 1] + text[midIndex];
    } else {
        // Odd length: return the middle character
        return text[midIndex];
    }
}

console.log(getMiddleCharacter(text));
