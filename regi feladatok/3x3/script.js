function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleGrid() {
    const gridItems = Array.from(document.querySelectorAll('.grid-item'));
    const numbers = gridItems.map(item => item.textContent);
    shuffleArray(numbers);
    gridItems.forEach((item, index) => {
        item.textContent = numbers[index];
    });
}