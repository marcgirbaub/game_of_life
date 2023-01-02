"use strict";

const playBtnElement = document.getElementsByClassName("buttons__play")[0];
const pauseBtnElement = document.getElementsByClassName("buttons__pause")[0];
const resetBtnElement = document.getElementsByClassName("buttons__reset")[0];

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const resolution = 10;
canvas.width = 400;
canvas.height = 400;

const cols = canvas.width / resolution;
const rows = canvas.height / resolution;

const buildGrid = () => {
  const grid = new Array(cols)
    .fill(null)
    .map(() =>
      new Array(rows).fill(null).map(() => Math.floor(Math.random() * 2))
    );

  return grid;
};

const drawGrid = (grid) => {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];

      if (cell === 1) {
        ctx.fillStyle = "black";
      } else {
        ctx.fillStyle = "white";
      }

      ctx.beginPath();
      ctx.rect(col * resolution, row * resolution, resolution, resolution);
      ctx.fill();
    }
  }
};

const nextGenerationGrid = (grid) => {
  const nextGen = grid.map((arr) => [...arr]);

  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let numNeighbours = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x_cell = col + i;
          const y_cell = row + j;

          if (x_cell >= 0 && y_cell >= 0 && x_cell < cols && y_cell < rows) {
            const currentNeighbour = grid[col + i][row + j];
            numNeighbours += currentNeighbour;
          }
        }
      }

      if (cell === 1 && numNeighbours < 2) {
        nextGen[col][row] = 0;
      } else if (cell === 1 && numNeighbours > 3) {
        nextGen[col][row] = 0;
      } else if (cell === 0 && numNeighbours === 3) {
        nextGen[col][row] = 1;
      }
    }
  }
  return nextGen;
};

let gaming = false;
let updateGrid;
let gameGrid = buildGrid();
drawGrid(gameGrid);

const update = () => {
  gameGrid = nextGenerationGrid(gameGrid);
  drawGrid(gameGrid);
};

playBtnElement.addEventListener("click", () => {
  if (!gaming) {
    updateGrid = setInterval(update, 500);
  }

  gaming = true;
});

pauseBtnElement.addEventListener("click", () => {
  clearInterval(updateGrid);
  gaming = false;
});

resetBtnElement.addEventListener("click", () => {
  clearInterval(updateGrid);
  gameGrid = buildGrid();
  drawGrid(gameGrid);
  gaming = false;
});
