import "./style.css";

const board = document.getElementById("app");

const rows = Array(20).fill("");
const grid = Array(20)
  .fill()
  .map(() => [...rows]);

grid.forEach((item, rowIndex) => {
  item.forEach((data, colIndex) => {
    board.appendChild(createDiv(rowIndex, colIndex));
  });
});

function createDiv(rowIndex, colIndex) {
  const div = document.createElement("div");
  div.classList.add("cell");
  div.setAttribute("data-row", rowIndex);
  div.setAttribute("data-col", colIndex);
  return div;
}

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
  console.log(food);
  div.appendChild(food);
}

createFood();

setInterval(createFood, 2000);
