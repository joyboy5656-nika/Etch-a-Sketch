const container = document.getElementById("container");
const resizeBtn = document.getElementById("resize-btn");
const clearBtn = document.getElementById("clear-btn");
const sizeInput = document.getElementById("grid-size");

const MAX_SIZE = 100;

function createGrid(size) {
  container.innerHTML = "";
  sizeInput.value = size;

  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.dataset.interactions = "0";

    square.addEventListener("pointerenter", handleHover);

    container.appendChild(square);
  }
}

function handleHover(event) {
  const square = event.currentTarget;

  if (!square.dataset.color) {
    const r = Math.floor(Math.random() * 156) + 100;
    const g = Math.floor(Math.random() * 156) + 100;
    const b = Math.floor(Math.random() * 156) + 100;
    square.dataset.color = `rgb(${r}, ${g}, ${b})`;
    square.style.backgroundColor = square.dataset.color;
    square.style.opacity = "0.1";
  }

  let count = Number(square.dataset.interactions) + 1;
  if (count > 10) count = 10;
  square.dataset.interactions = String(count);
  square.style.opacity = String(count / 10);
}

function getValidatedSize(value) {
  const parsedValue = Number.parseInt(value, 10);

  if (!Number.isInteger(parsedValue) || parsedValue < 1 || parsedValue > MAX_SIZE) {
    return null;
  }

  return parsedValue;
}

function applyGridSize() {
  const size = getValidatedSize(sizeInput.value.trim());

  if (size === null) {
    alert("Please enter a whole number between 1 and 100.");
    return;
  }

  createGrid(size);
}

function clearGrid() {
  const squares = container.querySelectorAll(".grid-square");
  squares.forEach((square) => {
    square.dataset.color = "";
    square.dataset.interactions = "0";
    square.style.backgroundColor = "#fff";
    square.style.opacity = "1";
  });
}

resizeBtn.addEventListener("click", applyGridSize);
clearBtn.addEventListener("click", clearGrid);
sizeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    applyGridSize();
  }
});

createGrid(16);
