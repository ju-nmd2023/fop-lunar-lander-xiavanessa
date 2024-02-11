function setup() {
  createCanvas(700, 600);
  background(0, 0, 0);
  frameRate(30);
}

const startSpeed = 1;

let speed = startSpeed;
let acceleration = 1.1;
let deacceleration = 0.9;
let x = 150;
let y = 70;
let hasLanded = false;

function startScreen() {
  background(0, 0, 255);
  fill(255, 255, 0);
  rect(285 - 50, 200, 250, 90);

  fill(255, 0, 0);
  textSize(50);
  text("start", 360 - 50, 260);

  textSize(18);
  fill(255, 255, 255);
  text("1. Click the start button", 50, 400);
  text(
    "2. Pressed the upper key to make rocket landing slowly to win the game.",
    50,
    450
  );
  hasLanded = false;
  speed = startSpeed;
}

let didWin = false;

let hasDrawn = false;

function gameScreen() {
  noStroke();
  rocket(x, y);
  fill(0, 255, 0);
  ellipse(25, 450, 160);
  fill(50, 200, 0);
  ellipse(70, 480, 130);
  fill(80, 160, 20);
  ellipse(160, 480, 180);

  fill(0, 255, 0);
  ellipse(560, 450, 160);
  fill(50, 200, 0);
  ellipse(500, 480, 130);
  fill(80, 160, 20);
  ellipse(650, 480, 180);

  fill(215, 200, 200);
  rect(0, 500, width, 100);

  if (!hasLanded) {
    y = y + speed;

    //Speed
    if (keyIsDown(38)) {
      rocketFire(x, y);
      if (speed > 0.5) {
        speed = speed * deacceleration;
      }
    } else {
      if (speed < 8) {
        speed = speed * acceleration;
      }
    }
  }

  console.log(speed);

  //Check if landed
  if (y * 2 + 68 >= 500) {
    hasLanded = true;

    if (speed <= 3) {
      didWin = true;
    } else {
      didWin = false;
    }

    setTimeout(function () {
      state = "result";
    }, 1200); //wait 1.2 seconde before jump to result page
  }
}

function rocketFire(x, y) {
  translate(x, y);
  noStroke();
  fill(255, 0, 255);
  ellipse(x + 40, y + 75, 30, 40);
  fill(255, 155, 182);
  ellipse(x + 40, y + 70, 20, 30);
  fill(220, 20, 60);
  ellipse(x + 40, y + 65, 10, 20);
}

function rocket(x, y) {
  clear();
  push();
  background(110, 100, 200);
  translate(x, y);
  fill(255, 255, 255);
  strokeWeight(0);
  //lower part of the rocket
  quad(x, y, x + 80, y, x + 65, y + 50, x + 17, y + 50);
  fill(255, 0, 0);
  //top part of the rocket
  triangle(x + 7, y - 70, x + 73, y - 70, x + 40, y - 120);

  //middle part1
  fill(255, 0, 0);
  ellipse(x + 5, y - 15, 40);
  ellipse(x + 75, y - 15, 40);

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
  // the small fire
  fill(255, 0, 0);
  ellipse(x + 40, y + 60, 8, 15);
  pop();
}

let exitButtonX = 150;
let exitButtonY = 150;

function resultScreen() {
  fill(0, 0, 0);
  if (didWin) {
    background(0, 255, 0);
    fill(255, 255, 0);
    rect(285 - 50, 200, 250, 90);
    fill(0, 0, 0);
    textSize(45);
    text("You win!", 295 - 50, 260);
  } else {
    background(255, 0, 0);
    fill(255, 255, 0);
    rect(285 - 50, 200, 250, 90);
    fill(0, 0, 0);
    textSize(45);
    text("You lose!", 295 - 50, 260);
  }

  fill(255, 255, 255);
  rect(285 - 50, 300, 250, 90);
  fill(0, 0, 0);
  textSize(45);
  text("Restart", 315 - 50, 360);
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
    mouseX > 285 - 50 &&
    mouseX < 535 - 50 &&
    mouseY > 200 &&
    mouseX > 290 &&
    state === "start"
  ) {
    state = "game";
  } else if (
    state === "result" &&
    mouseX > 285 - 50 &&
    mouseX < 535 - 50 &&
    mouseY > 300 &&
    mouseY < 390
  ) {
    y = 70;
    state = "start";
  }
}
