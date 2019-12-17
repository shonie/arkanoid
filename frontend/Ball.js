class Ball {
    constructor({ initialCoordinates }) {
        this.coords = {
            x: initialCoordinates.x,
            y: initialCoordinates.y,
        };
    }
    move(x, y) {
        this.coords.x = x;
        this.coords.y = y;
    }
    moveRight(x) {
        this.coords.x += x;
    }
    moveDown(y) {
        this.coords.y += y;
    }
}

export default Ball;