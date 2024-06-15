document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const turnIndicator = document.getElementById('turnIndicator');
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    const restartButton = document.getElementById('restartButton');

    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const createGrid = () => {
        grid.innerHTML = '';
        gameState.forEach((_, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => handleCellClick(index));
            grid.appendChild(cell);
        });
    };

    const handleCellClick = (index) => {
        if (gameState[index] || checkWinner()) return;

        gameState[index] = currentPlayer;
        grid.children[index].textContent = currentPlayer;

        if (checkWinner()) {
            showAlert(`${currentPlayer} wins!`, 'success');
        } else if (gameState.every(cell => cell)) {
            showAlert('It\'s a draw!', 'warning');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnIndicator.textContent = `${currentPlayer}'s turn`;
        }
    };

    const checkWinner = () => {
        return winPatterns.some(pattern => 
            pattern.every(index => gameState[index] === currentPlayer)
        );
    };

    const showAlert = (message, type) => {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.role = 'alert';
        alert.innerHTML = `
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `;
        alertPlaceholder.appendChild(alert);
    };

    const restartGame = () => {
        gameState = Array(9).fill(null);
        currentPlayer = 'X';
        turnIndicator.textContent = `${currentPlayer}'s turn`;
        createGrid();
        alertPlaceholder.innerHTML = '';
    };

    restartButton.addEventListener('click', restartGame);

    createGrid();
});
