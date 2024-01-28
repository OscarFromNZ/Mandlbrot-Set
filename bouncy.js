var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

class Ball {
    constructor(x, y, startingVelocity, colour, sideLength) {
        this.x = x;
        this.y = y;
        this.velocity = startingVelocity;
        this.colour = colour;
        this.sideLength = sideLength;
    }

    draw() {
        ctx.fillStyle = this.colour; 
        ctx.fillRect(this.x, this.y, this.sideLength, this.sideLength);
    }
}

// params are the shared values for all balls (maybe weird of doing it idk)
let balls = makeBalls({
    numberOfBallsEachSide: 1,
    startingVelocity: { x: -1, y: 1 },
    sideLength: 20,
});

requestAnimationFrame(gameLoop);

function makeBalls(data) {
    let balls = [];

    // create all balls
    for (let i = 0; i < data.numberOfBallsEachSide * 2; i++) {
        let spacing = c.height / (data.numberOfBallsEachSide + 1);
        let y = spacing * (i % data.numberOfBallsEachSide + 1);

        let diff = 0;
        let colour = 'cyan';

        if (i > data.numberOfBallsEachSide / 2) {
            diff = c.width / 2;
            colour = 'black';
        }

        balls.push(new Ball(
            (c.width / 4) + diff, // x
            y, // y
            { ...data.startingVelocity }, // THIS WAS THE PROBLEM, I HAD just data.startingVelocity
            colour,
            data.sideLength
        ));
    }

    return balls;
}

function gameLoop() {
    ctx.clearRect(0, 0, c.width, c.height); // clearing the canvas

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];

        console.log(ball.colour);

        if (ball.x + ball.sideLength > c.width || ball.y + ball.sideLength > c.height) {
            if (ball.x + ball.sideLength > c.width) {
                ball.velocity.x *= -1;
                ball.x = c.width - ball.sideLength;
            }
            if (ball.y + ball.sideLength > c.height) {
                ball.velocity.y *= -1;
                ball.y = c.height - ball.sideLength;
            }
        }

        if (ball.x < 0 || ball.y < 0) {
            if (ball.x < 0) {
                ball.velocity.x *= -1;
                ball.x = 0;
            }
            if (ball.y < 0) {
                ball.velocity.y *= -1;
                ball.y = 0;
            }
        }

        let dx = ball.velocity.x * 1;
        let dy = ball.velocity.y * 1;

        ball.x += dx;
        ball.y += dy;

        ball.draw();
    }

    requestAnimationFrame(gameLoop);
}