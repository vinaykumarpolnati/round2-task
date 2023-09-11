document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart-button");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                message.textContent = `${currentPlayer} wins!`;
                return;
            }
        }

        if (!gameBoard.includes("")) {
            gameActive = false;
            message.textContent = "It's a draw!";
        }
    }

    function handleCellClick(cell, index) {
        if (!gameActive || gameBoard[index] !== "") return;

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.backgroundColor = currentPlayer === "X" ? "#2196F3" : "#F44336";

        checkWin();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function restartGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        message.textContent = "";
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.style.backgroundColor = "#ddd";
        });
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(cell, index));
    });

    restartButton.addEventListener("click", restartGame);
});