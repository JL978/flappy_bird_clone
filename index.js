//Declare global variables (needed to be used in different functions)
const WIN_WIDTH = 400;
const WIN_HEIGHT = WIN_WIDTH * 1.62;
const GROUND_HEIGHT = 110;

let bird;
let score;
let gamePlay;
let BIRD_IMG;
let BG_IMG;
let BASE_IMG;
let PIPE_UP_IMG;
let PIPE_DOWN_IMG;

//P5js functions - determines main logic of the game
//Everything that might take some time to load goes here

function preload() {
	BIRD_IMG = [
		loadImage("assets/bird1.png"),
		loadImage("assets/bird2.png"),
		loadImage("assets/bird3.png"),
	];
	BG_IMG = loadImage("assets/bg.png");
	BASE_IMG = loadImage("assets/base.png");
	PIPE_UP_IMG = loadImage("assets/pipeUp.png");
	PIPE_DOWN_IMG = loadImage("assets/pipeDown.png");
}

//Configuration of game window
function setup() {
	//P5js functions
	createCanvas(WIN_WIDTH, WIN_HEIGHT);
	angleMode(DEGREES);
	frameRate(30);
	//Initialize global game objects instances
	gameStartConditions();
}

function draw() {
	//Setting background - using imageMode(CORNER) as there seem to be a
	//bug when using imageMode(CENTER) in the background
	background(BG_IMG);

	if (gamePlay) {
		pipesUpdate();
		ground.update();
	}

	pipes.forEach((pipe) => {
		pipe.show();
	});
	score.show();
	ground.show();

	bird.update();
	//Bird imagemode was made to be centered, gotta change the imageMode back to corner
	//before the next render so the background renders right

	imageMode(CORNER);
}

//P5 functions for interaction events
function keyPressed() {
	if (key === " ") {
		gamePlay && bird.jump();
		!gamePlay && bird.hitGround() && gameStartConditions();
	}
}

function mouseClicked() {
	gamePlay && bird.jump();
	!gamePlay && bird.hitGround() && gameStartConditions();
}

function gameStartConditions() {
	bird = new Bird();
	ground = new Ground();
	score = new Score(0);
	gamePlay = true;
	pipes = [];
}

function pipesUpdate() {
	if (frameCount % 60 === 0) {
		const pipe = new Pipe();
		pipes.push(pipe);
	}

	pipes.forEach((pipe, idx) => {
		pipe.update();
		if (pipe.isOff()) {
			pipes.splice(idx, 1);
		}

		if (pipe.isPassed(bird) && !pipe.isPassedCounted) {
			score.incrementBy(1);
			pipe.isPassedCounted = true;
		}

		if (pipe.isCollided(bird)) {
			gamePlay = false;
		}
	});
}
