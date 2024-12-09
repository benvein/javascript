import input from "./input.js";

async function getNumbersFromInput() {
    let getnums = await input("szamok: ")    
    const numbers = getnums.split(' ').map(num => Number(num.trim()));
    
    return numbers;
}

let nums = await getNumbersFromInput()

function additiveInverse(numbers) {
    return numbers.map(num => -num);
}

console.log(additiveInverse(nums));