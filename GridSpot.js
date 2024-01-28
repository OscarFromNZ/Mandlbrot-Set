class GridSpot {
    constructor(x, y, colour, canvas, context, gridSize) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.canvas = canvas;
        this.context = context;
        this.gridSize = gridSize;
        
        this.sideLength = gridSize; // oops
    }

    draw() {
        this.context.beginPath()
        this.context.rect(this.x, this.y, this.gridSize, this.gridSize);
        this.context.fillStyle = this.colour;
        this.context.fill();
    }
}