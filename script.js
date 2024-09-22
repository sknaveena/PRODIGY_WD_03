const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

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

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] || !gameActive) {
        return;
    }

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        messageDisplay.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell)) {
        messageDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    messageDisplay.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
