function mouseMoveHandler(e) {
	const relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddle.x = relativeX - paddle.width/2;
	}
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

stage = new Stage();
paddle = new Paddle(canvas.width, canvas.height);
score = new Score(10);
lives = new Hp(3,canvas.width);
ball = new Ball(canvas.width, canvas.height);


document.addEventListener("mousemove", mouseMoveHandler, false);

window.onload = function() {
	canvas.onmousedown = function(e) {
		paddle.onmousedown(e);
	}
	canvas.onmousemove = function(e) {
		paddle.calcMouseCoordinate(e);
	}
	canvas.onmouseup = function(e) {
		paddle.onmouseup(e);
	}
	canvas.onmouseout = function(e) {
		paddle.onmouseout(e);
	}
};

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);


	stage.draw(ctx);
	ball.draw(ctx);
	paddle.draw(ctx);
	score.draw(ctx);

	if(ball.move(stage.blocks, paddle, score) != true) {
		lives.damage();
		paddle.clear();
	}
	lives.draw(ctx);


	if(lives.check()) {
		alert("GAME OVER");
		document.location.reload();
	}

	requestAnimationFrame(draw);
}

draw();

