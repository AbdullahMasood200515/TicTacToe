document.addEventListener('DOMContentLoaded', function () {
    const boxes = document.querySelectorAll('.box');
    const resultContainer = document.querySelector('.result');
    const restartButton = document.querySelector('.restart');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    restartButton.addEventListener('click', restartGame);

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            if (gameActive && !box.textContent) {
                makeMove(box);
                checkWinner();
                switchPlayer();
            }
        });
    });

    function makeMove(box) {
        const index = box.id - 1;
        box.textContent = currentPlayer;
        gameBoard[index] = currentPlayer;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                displayWinner();
                return;
            }
        }

        if (!gameBoard.includes('')) {
            displayDraw();
        }
    }

    function displayWinner() {
        resultContainer.querySelector('.msg').textContent = `Congratulations! Player ${currentPlayer} wins`;
        resultContainer.style.backgroundColor = 'green';
        showResult();
    }

    function displayDraw() {
        resultContainer.querySelector('.msg').textContent = "It's a draw!";
        resultContainer.style.backgroundColor = 'gray';
        showResult();
    }

    function showResult() {
        resultContainer.style.opacity = '1';
        gameActive = false;
    }

    function restartGame() {
        boxes.forEach(box => {
            box.textContent = '';
        });

        resultContainer.style.opacity = '0';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
    }
});
