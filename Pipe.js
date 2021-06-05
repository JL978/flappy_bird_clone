function Pipe() {
	this.SCALE = 1.75;
	this.velocity = 5;
	this.gap = 200;

	this.x = width;
	this.height = random(200, 400);
	this.topPosition = this.height - this.SCALE * PIPE_DOWN_IMG.height - this.gap;
	this.isPassedCounted = false;

	this.show = () => {
		image(
			PIPE_UP_IMG,
			this.x,
			this.height,
			this.SCALE * PIPE_UP_IMG.width,
			this.SCALE * PIPE_UP_IMG.height
		);
		image(
			PIPE_DOWN_IMG,
			this.x,
			this.topPosition,
			this.SCALE * PIPE_DOWN_IMG.width,
			this.SCALE * PIPE_DOWN_IMG.height
		);
	};

	this.update = () => {
		this.x = this.x - this.velocity;
	};

	this.isOff = () => {
		return this.x < -this.SCALE * PIPE_UP_IMG.width;
	};

	this.collide = (bird) => {
		const cx = bird.x;
		const cy = bird.y;
		const dia = BIRD_IMG[0].width * bird.SCALE * 0.85;

		const topPosition =
			this.height - this.SCALE * PIPE_DOWN_IMG.height - this.gap;
		const collideTop = collideRectCircle(
			this.x,
			topPosition,
			this.SCALE * PIPE_DOWN_IMG.width,
			this.SCALE * PIPE_DOWN_IMG.height,
			cx,
			cy,
			dia
		);
		const collideBottom = collideRectCircle(
			this.x,
			this.height,
			this.SCALE * PIPE_UP_IMG.width,
			this.SCALE * PIPE_UP_IMG.height,
			cx,
			cy,
			dia
		);

		return collideTop || collideBottom;
	};

	this.passed = (bird) => {
		return bird.x > this.x + Math.floor((this.SCALE * PIPE_UP_IMG.width) / 2);
	};
}
