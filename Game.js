class Game {
    constructor(canvas, context, constants) {
        this.canvas = canvas;
        this.context = context;

        this.balls = [];
        this.grids = [];

        this.gameLoop = this.gameLoop.bind(this);
        this.constants = constants;

        this.makeBalls();
        this.makeGrids();
    }

    makeBalls() {
        // create all balls
        for (let i = 0; i < this.constants.numberOfBallsEachSide * 2; i++) {
            let spacing = c.height / (this.constants.numberOfBallsEachSide + 1);
            let y = spacing * (i % this.constants.numberOfBallsEachSide + 1);
            let diff = 0;

            let colour = 'black';

            // doesn't work for odd numbers
            if (i > (this.constants.numberOfBallsEachSide / 2)) {
                diff = c.width / 2;
                colour = 'cyan';
            }

            this.balls.push(new Ball(
                (c.width / 4) + diff, // x
                y, // y
                { ...this.constants.startingVelocity },
                colour,
                this.constants.gridSize,
                this.canvas,
                this.context
            ));
        }
    }

    makeGrids() {
        // for every grid spot
        for (let x = 0; x <= this.canvas.width; x += this.constants.gridSize) {
            for (let y = 0; y <= this.canvas.height; y += this.constants.gridSize) {
                this.grids.push(new GridSpot(x, y, (x < this.canvas.width / 2 ? 'cyan' : 'black'), this.canvas, this.context, this.constants.gridSize));
            }
        }
    }

    gameLoop() {
        ctx.clearRect(0, 0, c.width, c.height); // clearing the canvas

        for (let grid of this.grids) {
            grid.draw();
        }

        for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];

            // collision stuff
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

            // general velocity stuff
            let dx = ball.velocity.x * 1;
            let dy = ball.velocity.y * 1;

            ball.x += dx;
            ball.y += dy;

            // grid stuff (changing colour)
            let gridIndices = this.getGridIndicesThatBallIsOn(ball);

            for (let gridIndex of gridIndices) {
                if (this.grids[gridIndex].colour == ball.colour) {
                    console.log('collision with ball with colour: ' + ball.colour);
                    // change grid colour
                    this.grids[gridIndex].colour = this.getOppositeColour(ball.colour);
            
                    // reverse velocity
                    ball.velocity.x *= -1;
                    ball.velocity.y *= -1;
                }
            }

            ball.draw();
        }

        if (this.isIntersecting(this.balls[0], this.balls[1])) {
            this.balls[0].velocity.x *= -1;
            this.balls[0].velocity.y *= -1;

            this.balls[1].velocity.x *= -1;
            this.balls[1].velocity.y *= -1;
        }

        requestAnimationFrame(this.gameLoop);
    }

    getGridIndicesThatBallIsOn(ball) {
        let indices = [];
    
        for (let i = 0; i < this.grids.length; i++) {
            let grid = this.grids[i];
    
            if (this.isIntersecting(ball, grid)) {
                indices.push(i);
            }
        }
    
        return indices;
    }

    getOppositeColour(colour) {
        if (colour === 'cyan') {
            return 'black'
        } else {
            return 'cyan'
        }
    }

    isIntersecting(square1, square2) {
        // simple AABB
        function isCornerInside(corner, square) {
            return corner.x >= square.x && corner.x <= square.x + square.sideLength && corner.y >= square.y && corner.y <= square.y + square.sideLength;
        }
    
        let cornersSquare = [
            { x: square1.x, y: square1.y },
            { x: square1.x + square1.sideLength, y: square1.y },
            { x: square1.x, y: square1.y + square1.sideLength },
            { x: square1.x + square1.sideLength, y: square1.y + square1.sideLength }
        ];

        let matchFound = false;
    
        for (let i = 0; i < cornersSquare.length; i++) {
            if (isCornerInside(cornersSquare[i], square2)) {
                matchFound = true;
            }
        }
    
        return matchFound;
    }    
    
}