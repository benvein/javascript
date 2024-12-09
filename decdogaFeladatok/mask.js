import input from './input.js';

let cc = await input("text: ");

function maskify(cc) {
    if (cc.length <= 4) {
        return cc; 
    }
    
    const maskedPart = '#'.repeat(cc.length - 4); 
    const visiblePart = cc.slice(-4); 
    
    return maskedPart + visiblePart; 
}

console.log(maskify(cc));