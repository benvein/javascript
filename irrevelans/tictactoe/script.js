const statusDisplay = document.querySelector('.gamestatus');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `${currentPlayer} nyert`;
const drawMessage = () => "Döntetlen";
const currentPlayerTurn = () => `Jelenleg ${currentPlayer} játékos lép`;
const hvhButton = document.getElementById('humanVsHuman');
const hvcButton = document.getElementById('humanVsComputer');
let mode = "";
    

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

    if (currentPlayer === "O" && gameActive && mode == "computer") {
        setTimeout(() => {
            computerMove();
        }, 500);
    }
}

function computerMove() {
    let availableCells = gameState.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const clickedCell = document.querySelector(`.cell[data-cell-index="${randomIndex}"]`);
    handleCellPlayed(clickedCell, randomIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
                .forEach(cell => cell.innerHTML = "");
}

function startGame(mode) {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    gameContainer.style.display = "block"; 
    restartButton.style.display = "block"; 
    if (mode === 'computer') {
        currentPlayer = "X";
    }
}

hvhButton.addEventListener('click', () => {
    mode = "human"
    startGame(mode);
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
});

hvcButton.addEventListener('click', () => {
    mode = "computer"
    startGame(mode);
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
});

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.gamerestart').addEventListener('click', handleRestartGame);