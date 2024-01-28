var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

let constants = {
    numberOfBallsEachSide: 1,
    startingVelocity: { x: -5, y: 5 },
    gridSize: 15
};

let game = new Game(c, ctx, constants);

requestAnimationFrame(game.gameLoop);

canvas.addEventListener('click', function(event) {
    game.balls[0].x = event.clientX;
    game.balls[0].y = event.clientY;
}, false);