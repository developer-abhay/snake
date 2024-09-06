import "./style.css";

const board = document.getElementById("app");
const rows = Array(20).fill("");
let grid = Array(20)
  .fill()
  .map(() => [...rows]);

let snake = [
  [10, 10],
  [10, 9],
  [10, 8],
];

let direction = "up";

// Create cells
function createDiv(rowIndex, colIndex) {
  const div = document.createElement("div");
  div.classList.add("cell");
  div.setAttribute("data-row", rowIndex);
  div.setAttribute("data-col", colIndex);
  return div;
}

// Create food
function createFood() {
  const oldFood = document.querySelector(".food");
  if (oldFood) {
    oldFood.remove();
  }

  const row = Math.floor(Math.random() * 20);
  const col = Math.floor(Math.random() * 20);
  const div = document.querySelector(`[data-row='${row}'][data-col='${col}']`);

  const food = document.createElement("div");
  food.classList.add("food");

  div.appendChild(food);
}

// Render snake
function renderSnake() {
  snake.forEach((item, index) => {
    const div = document.querySelector(
      `[data-row='${item[0]}'][data-col='${item[1]}']`
    );
    const snakeCell = document.createElement("div");
    snakeCell.classList.add("snake-cell");
    if (index == 0) {
      snakeCell.classList.add("snake-head");
    }

    div.appendChild(snakeCell);
  });
}

// Move snake
function moveSnake() {
  const copy = JSON.parse(JSON.stringify(snake)); //Deep copy of snake

  if (direction == "up") {
    copy.forEach((item, index) => {
      if (index == 0) {
        item[0] -= 1;
      } else {
        copy[index] = snake[index - 1];
      }
    });
  } else if (direction == "down") {
    copy.forEach((item, index) => {
      if (index == 0) {
        item[0] += 1;
      } else {
        copy[index] = snake[index - 1];
      }
    });
  } else if (direction == "right") {
    copy.forEach((item, index) => {
      if (index == 0) {
        item[1] += 1;
      } else {
        copy[index] = snake[index - 1];
      }
    });
  } else {
    copy.forEach((item, index) => {
      if (index == 0) {
        item[1] -= 1;
      } else {
        copy[index] = snake[index - 1];
      }
    });
  }

  snake = [...copy];
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (cell.children[0]?.classList.contains("snake-cell")) {
      cell.innerHTML = "";
    }
  });
  renderSnake();
  console.log(snake);
}

// Arrow keys event listeners
window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    direction = "up";
  } else if (e.key == "ArrowDown") {
    direction = "down";
  } else if (e.key == "ArrowLeft") {
    direction = "left";
  } else if (e.key == "ArrowRight") {
    direction = "right";
  }
});

// Rendering grid
grid.forEach((item, rowIndex) => {
  item.forEach((data, colIndex) => {
    board.appendChild(createDiv(rowIndex, colIndex));
  });
});

// createFood();
// setInterval(createFood, 2000);
renderSnake();
setInterval(moveSnake, 1000);
