import input from './input.js'

let str = await input("text: ");

function XO(str) {
    // Convert the string to lowercase
    const lowerStr = str.toLowerCase();
    
    // Count occurrences of 'x' and 'o'
    const xCount = (lowerStr.match(/x/g) || []).length;
    const oCount = (lowerStr.match(/o/g) || []).length;
    
    // Return true if counts are equal, otherwise false
    return xCount === oCount;
}

console.log(XO(str));
