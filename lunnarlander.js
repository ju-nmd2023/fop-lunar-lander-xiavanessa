function setup() {
  createCanvas(700, 500);
  background(0, 0, 0);
}

function startScreen() {
  background(0, 0, 255);
  fill(255, 255, 0);
  rect(285, 200, 250, 90);

  fill(255, 0, 0);
  textSize(50);
  text("start now", width / 2, height / 2 - 60);
}

function gameScreen() {
  background(0, 0, 0);
}

function draw() {
  rocket(150, 70, 5);
}

function rocket(x, y, speed) {
  push();
  translate(x, y);
  fill(255, 255, 255);
  strokeWeight(0);
  //lower part of the rocket
  quad(x, y, x + 80, y, x + 65, y + 50, x + 17, y + 50);
  fill(255, 0, 0);
  //top part of the rocket
  triangle(x + 7, y - 70, x + 73, y - 70, x + 40, y - 120);

  //middle part1
  fill(255, 255, 255);
  ellipse(x + 40, y - 24, 85, 145);
  // yellow circle
  fill(255, 255, 0);
  ellipse(x + 38, y - 70, 60, 55);
  //small red and blue circles
  fill(255, 0, 0);
  ellipse(x + 40, y - 75, 30);
  fill(0, 0, 255);
  ellipse(x + 40, y - 75, 20);
  fill(255, 0, 0);
  ellipse(x + 40, y + 60, 8, 15);
  y = y + speed;
  pop();
}

function resultScreen() {
  background(255, 0, 0);
  textSize(50);
  text("result", width / 2 - 70, height / 2);
}

let state = "start";

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "result") {
    resultScreen();
  }
}

function mouseClicked() {
  if (
    mouseX > 285 &&
    mouseX < 535 &&
    mouseY > 200 &&
    mouseX > 290 &&
    state === "start"
  ) {
    state = "game";
  }
}
