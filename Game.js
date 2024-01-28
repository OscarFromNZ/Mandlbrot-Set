class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.balls = [];
        this.grids = [];
        this.gameLoop = this.gameLoop.bind(this);

        this.gridSize = 50;
    }

    makeBalls(data) {
        // create all balls
        for (let i = 0; i < data.numberOfBallsEachSide * 2; i++) {
            let spacing = c.height / (data.numberOfBallsEachSide + 1);
            let y = spacing * (i % data.numberOfBallsEachSide + 1);
            let diff = 0;
            
            let colour = 'black';
    
            // doesn't work for odd numbers
            if (i > (data.numberOfBallsEachSide / 2)) {
                diff = c.width / 2;
                colour = 'cyan';
            }
    
            this.balls.push(new Ball(
                (c.width / 4) + diff, // x
                y, // y
                { ...data.startingVelocity },
                colour,
                data.sideLength,
                this.canvas,
                this.context
            ));
        }
    }

    makeGrids() {
        // for every grid spot
        for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
            for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
                this.grids.push(new GridSpot(x, y, (x < this.canvas.width / 2 ? 'cyan' : 'black'), this.canvas, this.context, this.gridSize));
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
            let gridIndex = this.getGridIndexThatBallIsOn(ball);

            if (gridIndex) {
                console.log(this.grids[gridIndex].colour, ball.colour);
                if (this.grids[gridIndex].colour == ball.colour) {
                    console.log('collision with ball with colour: ' + ball.colour); // why is this always just black, the cyan ball isn't  being picked up
                    // change grid colour
                    this.grids[gridIndex].colour = this.getOppositeColour(ball.colour);
    
                    // reverse velocity
                    ball.velocity.x *= -1;
                    ball.velocity.y *= -1;
                }    
            }

            ball.draw();
        }
    
        requestAnimationFrame(this.gameLoop);
    }

    getGridIndexThatBallIsOn(ball) {
        for (let i = 0; i < this.grids.length; i++) {
            let grid = this.grids[i];

            if (ball.x >= grid.x && ball.x <= grid.x + this.gridSize && ball.y >= grid.y && ball.y <= grid.y + this.gridSize) {
                return i;
            }
        }
    }

    getOppositeColour(colour) {
        if (colour === 'cyan') {
            return 'black'
        } else {
            return 'cyan'
        }
    }
}