var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

for (let Px = 0; Px < c.width; Px++) {
    for (let Py = 0; Py < c.height; Py++) {

        let x0 = convertPixelToMandlebrotScale(Px, 0, c.width, -2.00, 0.47);
        let y0 = convertPixelToMandlebrotScale(Py, 0, c.height, -1.12, 1.12);

        let x = 0.0;
        let y = 0.0;
        let iteration = 0;
        let maxIteraction = 200;

        while (x * x + y * y <= 2 * 2 && iteration < maxIteraction) {
            x = x * x - y * y + x0;
            y = 2 * x* y + y0;
            iteration++;
        }

        ctx.fillStyle = iteration === maxIteraction ? '#000' : `hsl(0, 100%, ${iteration % 256}%)`;
        ctx.fillRect(Px, Py, 1, 1);
    }
}

function convertPixelToMandlebrotScale(value, fromLow, fromHigh, toLow, toHigh) {
    return toLow + (value - fromLow) * (toHigh - toLow) / (fromHigh - fromLow);
}