var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

let game = new Game(c, ctx);

game.makeBalls({
    numberOfBallsEachSide: 1,
    startingVelocity: { x: -5, y: 5 },
    sideLength: 50,
});

game.makeGrids();

requestAnimationFrame(game.gameLoop);