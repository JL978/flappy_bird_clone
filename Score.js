function Score(current) {
	this.current = current;

	this.show = () => {
		textSize(32);
		fill(255, 255, 255);
		text(this.current.toString(), 20, 40);
	};

	this.incrementBy = (amount) => {
		this.current += amount;
	};
}
