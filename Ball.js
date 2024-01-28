class Ball {
    constructor(x, y, startingVelocity, colour, sideLength, canvas, context) {
        this.x = x;
        this.y = y;
        this.velocity = startingVelocity;
        this.colour = colour;
        this.sideLength = sideLength;

        // I don't understand global vars so I'm making it all private oop
        this.canvas = canvas;
        this.context = context;
    }

    draw() {
        this.context.fillStyle = this.colour; 
        this.context.fillRect(this.x, this.y, this.sideLength, this.sideLength);
    }
}