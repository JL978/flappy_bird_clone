function Bird() {
	//Functional variable, DO NOT UPDATE PROGRAMMATICALLY
	this.FLAP_INTERVAL = 2;
	this.SCALE = 1.75;

	//Positioning and tilt varibles to be updated every frame
	this.y = WIN_HEIGHT / 2;
	this.x = WIN_WIDTH / 3;
	this.tilt = 0;

	//Physics variables
	this.tick_count = 0;
	this.img_count = 0;
	this.gravity = 0.2;
	this.velocity = 0; //Jump velocity - NOT CONSTANT VELOCITY
	this.jump_height = this.y + 20;

	//Take in integers 0, 1, 2 to show different wing state
	this.show = (i) => {
		imageMode(CENTER);
		image(
			BIRD_IMG[i],
			0,
			0,
			this.SCALE * BIRD_IMG[i].width,
			this.SCALE * BIRD_IMG[i].height
		);
	};

	this.update = () => {
		let displacement = this.getDisplacement();
		console.log(displacement);
		this.y -= displacement;
		this.updateTiltBasedOnDisplacement(displacement);

		//Updates to keep track of flapping mechanism
		this.img_count += 1;
		if (this.img_count > this.FLAP_INTERVAL * 4) {
			this.img_count = 0;
		}

		//Limit y position of the bird
		if (this.y > height - 110) {
			this.y = height - 110;
			displacement = 0;
		}

		if (this.y < -30) {
			this.y = -30;
			displacement = 0;
		}
	};

	//Jump event - add velocity to bird, reset tick_count for physics, record jump_height to keep track of rotation
	this.jump = () => {
		this.velocity = 10; //give object positive velocity simulating a jump
		this.tick_count = 0;
		this.jump_height = this.y;
	};

	this.getDisplacement = () => {
		// Displacement means the amount of y position change every update
		this.tick_count += 1;
		//kinematics equation - initial velocity is 0 in most cases except for jump event
		let displacement =
			this.velocity - 0.5 * this.gravity * this.tick_count ** 2;
		this.velocity -= this.gravity * this.tick_count;

		//Limiting velocity so fall rate doesn't get too high
		if (this.velocity < 0) {
			this.velocity = 0;
		}

		if (displacement >= 5) {
			displacement = 5;
		}

		//Adding more 'bounce' to jump
		if (displacement > 0) {
			displacement += 10;
		}
		return displacement;
	};

	this.updateTiltBasedOnDisplacement = (displacement) => {
		if (displacement > 0 || this.y < this.jump_height) {
			// Negative means tilt up because counter-clockwise
			this.tilt = -25;
		} else {
			if (this.tilt < 76) {
				this.tilt += 20;
			}
			if (this.tilt > 90) {
				this.tilt = 90;
			}
		}
	};

	this.hitGround = () => {
		return this.y > height - GROUND_HEIGHT - BIRD_IMG[0].width;
	};
}
