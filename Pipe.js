function Pipe() {
	this.SCALE = 1.75;
	this.velocity = 5;
	this.gap = 200;

	this.x = width;
	this.y = random(200, 400);

	this.scaledWidth = this.SCALE * PIPE_UP_IMG.width;
	this.scaledHeight = this.SCALE * PIPE_UP_IMG.height;

	this.topPosition = this.y - this.scaledHeight - this.gap;
	this.isPassedCounted = false;

	this.show = () => {
		image(PIPE_UP_IMG, this.x, this.y, this.scaledWidth, this.scaledHeight);
		image(
			PIPE_DOWN_IMG,
			this.x,
			this.topPosition,
			this.scaledWidth,
			this.scaledHeight
		);
	};

	this.update = () => {
		this.x = this.x - this.velocity;
	};

	this.isOff = () => {
		return this.x < -this.scaledWidth;
	};

	this.isCollided = (bird) => {
		const cx = bird.x;
		const cy = bird.y;
		const dia = BIRD_IMG[0].width * bird.SCALE * 0.85;

		const topPosition = this.y - this.scaledHeight - this.gap;
		const collideTop = collideRectCircle(
			this.x,
			topPosition,
			this.scaledWidth,
			this.scaledHeight,
			cx,
			cy,
			dia
		);
		const collideBottom = collideRectCircle(
			this.x,
			this.y,
			this.scaledWidth,
			this.scaledHeight,
			cx,
			cy,
			dia
		);

		return collideTop || collideBottom;
	};

	this.isPassed = (bird) => {
		return bird.x > this.x + Math.floor(this.scaledWidth / 2);
	};
}
