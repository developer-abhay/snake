import "./style.css";

const board = document.getElementById("app");
let direction = "right";

const rows = Array(20).fill("");
let grid = Array(20)
  .fill()
  .map(() => [...rows]);

let snake = [
  [10, 10],
  [10, 9],
  [10, 8],
];

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
  const row = Math.floor(Math.random() * 20);
  const col = Math.floor(Math.random() * 20);
  const div = document.querySelector(`[data-row='${row}'][data-col='${col}']`);

  const food = document.createElement("div");
  food.classList.add("food");
  div.appendChild(food);
  //   if (!cell.children[0]?.classList.contains("snake-cell")) {
  //   }
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

  eatFood();
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (cell.children[0]?.classList.contains("snake-cell")) {
      cell.innerHTML = "";
    }
  });
  renderSnake();
}

// Eat food
function eatFood() {
  const oldFood = document.querySelector(".food");
  const row = oldFood.parentElement.dataset.row;

  const col = oldFood.parentElement.dataset.col;

  if (oldFood && snake[0][0] == row && snake[0][1] == col) {
    oldFood.remove();
    createFood();
    snake.push(["", ""]);
  }
}

// Arrow keys event listeners
window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp" && direction != "down") {
    direction = "up";
  } else if (e.key == "ArrowDown" && direction != "up") {
    direction = "down";
  } else if (e.key == "ArrowLeft" && direction != "right") {
    direction = "left";
  } else if (e.key == "ArrowRight" && direction != "left") {
    direction = "right";
  }
});

// Rendering grid
grid.forEach((item, rowIndex) => {
  item.forEach((data, colIndex) => {
    board.appendChild(createDiv(rowIndex, colIndex));
  });
});

createFood();
renderSnake();

setInterval(moveSnake, 100);
