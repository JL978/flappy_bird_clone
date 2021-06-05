function Ground() {
	this.velocity = 5;
	this.x1 = 0;
	this.x2 = width;
	this.y = height - GROUND_HEIGHT;

	this.update = () => {
		this.x1 -= this.velocity;
		this.x2 -= this.velocity;
		if (this.x1 <= -width) {
			this.x1 = width;
		}
		if (this.x2 <= -width) {
			this.x2 = width;
		}
	};

	this.show = () => {
		image(BASE_IMG, this.x1, this.y, width, BASE_IMG.height);
		image(BASE_IMG, this.x2, this.y, width, BASE_IMG.height);
	};
}
