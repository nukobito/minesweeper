class Square {
    static get Width() { return 32; }
    static get Height() { return 32; }
    static get Type() {
        return {
            Empty: 'Empty',
            Bomb: 'Bomb',
            Number: 'Number'
        };
    }
    constructor() {
        this.type = Square.Type.Empty;
        this.number = 0;
        this.covered = true;
        this.flag = false;
    }
    render(context) {
        if (this.covered) {
            this._renderCover(context);
            if (this.flag) {
                this._renderFlag(context);
            }
        }
        else {
            switch (this.type) {
                case Square.Type.Empty: this._renderEmpty(context); break;
                case Square.Type.Bomb: this._renderBomb(context); break;
                case Square.Type.Number: this._renderNumber(context); break;
            }
        }
    }
    _renderCover(context) {
        context.fillStyle = 'gray';
        context.fillRect(0, 0, Square.Width, Square.Height);

        context.strokeStyle = 'black';
        context.strokeRect(0, 0, Square.Width, Square.Height);
    }
    _renderFlag(context) {
        context.fillStyle = 'yellow';
        context.beginPath();
        context.moveTo(5, 5);
        context.lineTo(Square.Width - 5, Square.Height / 2);
        context.lineTo(5, Square.Height - 5);
        context.fill();

    }
    _renderEmpty(context) {
        context.strokeStyle = 'black';
        context.strokeRect(0, 0, Square.Width, Square.Height);
    }
    _renderBomb(context) {
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(
            Square.Width / 2, Square.Height / 2,
            (Square.Width / 2) - 4,
            0, Math.PI * 2
        );
        context.fill();
    }
    _renderNumber(context) {
        context.fillStyle = 'green';
        context.font = 'bold 32px sans-serif';
        context.fillText(`${this.number}`, 0 + 4, Square.Height - 4);
    }
}

export default Square;