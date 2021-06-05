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

let pipes = [];
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
	//Initialize new game objects instances
	bird = new Bird();
	ground = new Ground();
	score = new Score(0);
	gamePlay = true;
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

	//Bird control logic
	translate(bird.x, bird.y);
	rotate(bird.tilt);
	if (bird.tilt > 80) {
		//If bird is pointing down, don't animate flapping
		bird.show(1);
	} else {
		//Flapping animation - using imageMode(CENTER) so the rotation
		//is around in the center of the image
		if (bird.img_count <= bird.FLAP_INTERVAL) {
			bird.show(0);
		} else if (bird.img_count <= bird.FLAP_INTERVAL * 2) {
			bird.show(1);
		} else if (bird.img_count <= bird.FLAP_INTERVAL * 3) {
			bird.show(2);
		} else if (bird.img_count <= bird.FLAP_INTERVAL * 4) {
			bird.show(1);
		}
	}

	if (bird.hitGround()) {
		gamePlay = false;
	}

	bird.update();

	//Chang the imageMode back to corner before the next render so the
	//background renders right

	imageMode(CORNER);
}

//P5 functions for interaction events
function keyPressed() {
	if (key === " ") {
		gamePlay && bird.jump();
	}
}

function mouseClicked() {
	gamePlay && bird.jump();
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

		if (pipe.passed(bird) && !pipe.isPassedCounted) {
			score.incrementBy(1);
			pipe.isPassedCounted = true;
		}

		if (pipe.collide(bird)) {
			gamePlay = false;
		}
	});
}
