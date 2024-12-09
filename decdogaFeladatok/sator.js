function isSatorSquare(square) {
    const n = square.length;

    // Check if the square is within the valid range
    if (n < 2 || n > 33) {
        return false;
    }

    // Check if all rows have the same length
    for (let row of square) {
        if (row.length !== n) {
            return false;
        }
    }

    // Create the words from the square
    const wordsAcross = square.map(row => row.join(''));
    const wordsDown = Array.from({ length: n }, (_, j) => square.map(row => row[j]).join(''));

    // Check if all words are the same across and down
    for (let i = 0; i < n; i++) {
        if (wordsAcross[i] !== wordsDown[i]) {
            return false;
        }
    }

    // Check if the words are the same when reversed
    for (let i = 0; i < n; i++) {
        const reversedWord = wordsAcross[i].split('').reverse().join('');
        if (wordsAcross[i] !== reversedWord) {
            return false;
        }
    }

    return true;
}

// Example usage:
const square1 = [
    ['a', 'b'],
    ['b', 'a']
];

console.log(isSatorSquare(square1));  // Output: false

const square2 = [
    ['s', 'a', 't', 'o', 'r'],
    ['a', 'r', 'e', 'p', 'o'],
    ['t', 'e', 'n', 'e', 't'],
    ['o', 'p', 'e', 'n', 'a'],
    ['r', 'o', 't', 'a', 's']
];

console.log(isSatorSquare(square2));  // Output: true