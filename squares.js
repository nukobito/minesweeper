import Square from "./square.js";

class Squares {
    static get Width() { return 9; }
    static get Height() { return 9; }
    static get Area() { return Squares.Width * Squares.Height; }
    static get BombQuantity() { return 15; }
    constructor() {
        this.squares = [];
        for (let i = 0; i < Squares.Area; i++) {
            this.squares.push(new Square());
        }

        const bombIndices = this._putBombs();
        this._calculateNumbers(bombIndices);
    }
    render(context) {
        this.squares.forEach((square, index) => {
            const [x, y] = [
                Math.floor(index % Squares.Width),
                Math.floor(index / Squares.Height)
            ];
            context.save();
            context.translate(x * Square.Width, y * Square.Height);
            square.render(context);
            context.restore();
        });
    }
    getSquare(x, y) {
        return this.squares[y * Squares.Width + x];
    }
    discover(x, y) {
        const square = this.getSquare(x, y);
        if (!square.covered)
            return true;

        square.covered = false;
        square.flag = false;

        if (square.type === Square.Type.Bomb)
            return false;

        if (square.type === Square.Type.Number)
            return true;

        [
            { x: -1, y:  0 },
            { x:  1, y:  0 },
            { x:  0, y: -1 },
            { x:  0, y:  1 }
        ].forEach(pos => {
            const [dx, dy] = [pos.x + x, pos.y + y];
            if (dx < 0 || Squares.Width <= dx || dy < 0 || Squares.Height <= dy)
                return;

            this.discover(dx, dy);
        });

        return true;
    }
    discoverAll() {
        for (const square of this.squares) {
            square.covered = false;
        }
    }
    isAllDiscovered() {
        let count = 0;
        for (const square of this.squares) {
            if (!square.covered)
                count++;
        }

        return count === Squares.Area - Squares.BombQuantity;
    }
    _putBombs() {
        const bombIndices = [];
        for (let i = 0; i < Squares.BombQuantity; i++) {
            const index = Math.floor(Math.random() * Squares.Area);
            const square = this.squares[index];
            if (square.type === Square.Type.Bomb) {
                --i;
                continue;
            }
            square.type = Square.Type.Bomb;
            bombIndices.push(index);
        }
        return bombIndices;
    }
    _calculateNumbers(bombIndices) {
        for (const bombIndex of bombIndices) {
            for (let n of [-1, 0, 1]) {
                for (let m of [-1, 0, 1]) {
                    const [x, y] = [
                        Math.floor(bombIndex % Squares.Width) + m,
                        Math.floor(bombIndex / Squares.Height) + n
                    ];
                    if (x < 0 || Squares.Width <= x || y < 0 || Squares.Height <= y)
                        continue;

                    const square = this.squares[y * Squares.Width + x];
                    if (square.type === Square.Type.Bomb)
                        continue;

                    square.type = Square.Type.Number;
                    square.number++;
                }
            }
        }
    }
}

export default Squares;