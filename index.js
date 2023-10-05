let currentPlayer = "X";
let grid_Items = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Filas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columnas
  [0, 4, 8],
  [2, 4, 6], // Diagonales
];

let items = document.querySelectorAll(".grid-items");

items.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (item.innerHTML === "" && !gameOver) {
      item.innerHTML = currentPlayer;
      grid_Items[index] = currentPlayer;
      if (winnerMoves()) {
        return;
      }

      currentPlayer = currentPlayer === "X" ? "0" : "X";
      console.log(`It's turn of player ${currentPlayer}`);

      if (grid_Items.every((item) => item !== "")) {
        gameOver = true;
        alert("The game is tied, there is no winner.");
        setTimeout(() => {
          clear();
          gameOver = false;
        }, 100);
        return;
      }

      if (winnerMoves("X")) {
        gameOver = true;
        alert(`Player ${currentPlayer} is the winner`);
        setTimeout(clear, 100);
        return;
      }

      if (winnerMoves("0")) {
        gameOver = true;
        alert(`Player ${currentPlayer} is the winner`);
        setTimeout(clear, 100);
        return;
      }
    }
  });
});

const winnerMoves = () => {
  const tie = grid_Items.every((item) => item !== "");
  if (tie) {
    setTimeout(() => {
      alert("The game is tied, there is no winner!");
      clear();
    }, 100);
    return true;
  }
  return winnerCombos.some((combo) => {
    const [a, b, c] = combo;
    if (
      grid_Items[a] &&
      grid_Items[a] === grid_Items[b] &&
      grid_Items[a] === grid_Items[c]
    ) {
      alert(`Player ${grid_Items[a]} is the winner`);
      setTimeout(() => {
        clear();
      }, 100);
      return true;
    }
  });
};

const clear = () => {
  items.forEach((item, index) => {
    item.innerHTML = "";
    grid_Items[index] = "";
    gameOver = true;
  });
  currentPlayer = "X";
  gameOver = false;
};
