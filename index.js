//INITIALIZED VALUES
let grid = document.getElementById("grid");
let PIXEL_VALUE = 32;
let DEFAULT_COLOR = "#5A5DAA";
let DEFAULT_TYPE = "draw";

//UI DOM
let drawButon = document.getElementById("mode-draw");
let eraseButon = document.getElementById("mode-erase");
let resetButon = document.getElementById("mode-reset");
let modeTypeText = document.querySelector(".mode-type");
let sizeValueText = document.querySelector("#size-value");
let sizeSlider = document.getElementById("size-slider");
let colorPicker = document.querySelector("#color-picker");
colorPicker.defaultValue = DEFAULT_COLOR;

//MOUSE HOVER AND PRESSED EVENT INSIDE GRID LAYOUT
let whenMousePressed = false;
const mouseDown = () => (whenMousePressed = true);
const mouseUp = () => (whenMousePressed = false);

//SELECTED PIXEL GRID
const activePixel = (event) => {
  console.log(whenMousePressed);
  if (event.type === "mouseover" && !whenMousePressed) return;

  if (DEFAULT_TYPE === "erase") {
    event.target.style.removeProperty("background");
  }
  if (DEFAULT_TYPE === "draw") {
    DEFAULT_COLOR = colorPicker.value;
    event.target.style.background = DEFAULT_COLOR;
  }
};

//TOGGLE SELECTION BUTTONS
drawButon.onclick = (event) =>
  (modeTypeText.textContent = DEFAULT_TYPE = "draw");
eraseButon.onclick = (event) =>
  (modeTypeText.textContent = DEFAULT_TYPE = "erase");
resetButon.onclick = (event) => {
  modeTypeText.textContent = DEFAULT_TYPE = "draw";
  PIXEL_VALUE = 32;
  resetGrid(grid);
};

//SET VALUE OF SIZE TEXT FIELD REAL TIME
sizeValueText.textContent = `${PIXEL_VALUE} x ${PIXEL_VALUE}`;
sizeSlider.onmousemove = ({ target: { value } }) =>
  (sizeValueText.textContent = `${value} x ${value}`);

//LISTEN ON SLIDER PIXEL VALUE CHANGE
sizeSlider.onchange = ({ target: { value } }) => updateSize(value);

//UPDATE PIXEL VALUE
const updateSize = (value) => {
  PIXEL_VALUE = value;
  resetGrid(grid);
};

//RESET THE GRID LAYOUT
const resetGrid = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  setupGrid();
};

//CREATE NEW GRID LAYOUT
const setupGrid = () => {
  grid.style.gridTemplateColumns = `repeat(${PIXEL_VALUE},1fr)`;
  grid.style.gridTemplateRows = `repeat(${PIXEL_VALUE},1fr)`;
  grid.style.height = PIXEL_VALUE * PIXEL_VALUE;

  for (let index = 0; index < PIXEL_VALUE * PIXEL_VALUE; index++) {
    //MANIPULATE DOM - CREATED DIV ELEMENT (pixel)
    let pixel = document.createElement("div");
    pixel.className = "pixel";
    pixel.style.cursor = "crosshair";
    pixel.style.width = `${PIXEL_VALUE}px"`;
    pixel.style.height = `${PIXEL_VALUE}px"`;

    //TOGGLE PRESSED EVENT INSIDE GRID LAYOUT
    pixel.addEventListener("mouseup", mouseUp);
    pixel.addEventListener("mousedown", mouseDown);

    //LISTEN FOR SELECTED PIXEL GRID EVENT
    pixel.addEventListener("mousedown", activePixel);
    pixel.addEventListener("mouseover", activePixel);
    pixel.addEventListener("click", activePixel);

    //ITERATE EACH CREATED PIXEL GRID TO GRID LAYOUT PARENT
    grid.appendChild(pixel);
  }
};

setupGrid();
