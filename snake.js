const cvs = document.querySelector("#snake-canvas");
const ctx = cvs.getContext("2d");
const startBtn = document.querySelector("#snake-start");

cvs.width = 500;
cvs.height = 500;
cvs.style.backgroundColor = "#161616";

const cell = 25;
let snake = [];

snake[0] = {
  x: Math.floor(Math.random() * 19 + 1) * cell,
  y: Math.floor(Math.random() * 19 + 1) * cell
};

let apple = {
  x: Math.floor(Math.random() * 19 + 1) * cell,
  y: Math.floor(Math.random() * 19 + 1) * cell
};

let score = document.querySelector("#snake-score");

score.textContent = 0;

let explosion = new Audio();
explosion.src = "audio/explosion.ogg";

let itemtake = new Audio();
itemtake.src = "audio/itemtake.ogg";

// direction controls
let d;
document.addEventListener("keydown", direction);

function direction(e) {
  let key = e.keyCode;
  if (key == 37 && d != "Right") {
    d = "Left";
  } else if (key == 38 && d != "Down") {
    d = "Up";
  } else if (key == 39 && d != "Left") {
    d = "Right";
  } else if (key == 40 && d != "Up") {
    d = "Down";
  }
}

// Collision
function collision(head, array) {
  // (newHead, snake)
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// draw all elements
function draw() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);

  // draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "rgb(0,255,24)";
    ctx.fillRect(snake[i].x, snake[i].y, cell, cell);

    ctx.strokeStyle = "#161616";
    ctx.strokeRect(snake[i].x, snake[i].y, cell, cell);
  }

  // draw apple
  ctx.fillStyle = "rgb(255,0,0)";
  ctx.fillRect(apple.x, apple.y, cell, cell);

  ctx.strokeStyle = "#161616";
  ctx.strokeRect(apple.x, apple.y, cell, cell);

  // get old snake head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // choose direction
  if (d == "Left") snakeX -= cell;
  if (d == "Up") snakeY -= cell;
  if (d == "Right") snakeX += cell;
  if (d == "Down") snakeY += cell;

  // increment snake by 1 cell, if it eats the apple
  if (snakeX == apple.x && snakeY == apple.y) {
    itemtake.play();
    score.textContent++;
    apple = {
      x: Math.floor(Math.random() * 19 + 1) * cell,
      y: Math.floor(Math.random() * 19 + 1) * cell
    };
  } else {
    // if not, remove the tail
    snake.pop();
  }

  // add new head
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // set game over rules
  if (
    snakeX < 0 ||
    snakeX > 19 * cell ||
    snakeY < 0 ||
    snakeY > 19 * cell ||
    collision(newHead, snake)
  ) {
    // game over
    explosion.play();
    setTimeout(function() {
      alert("GAME OVER!");
    }, 5);
    clearInterval(game);
    document.location.reload();
  }

  snake.unshift(newHead);
}

let game = setInterval(draw, 100);
