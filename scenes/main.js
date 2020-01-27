import Scene from "../scene.js";
import Title from "./title.js";
import Squares from "../squares.js";
import Square from "../square.js";
import GameOver from "./gameover.js";
import GameClear from "./gameclear.js";

class Main extends Scene {
    initial(engine) {
        this.squares = new Squares();

        engine.pushScene(new Title());
    }
    update(timeStamp, pointer, engine) {
        if (!pointer.left && !pointer.right)
            return;

        const [x, y] = [
            Math.floor(pointer.x / Square.Width),
            Math.floor(pointer.y / Square.Height)
        ];
        if (pointer.left) {
            const isSafe = this.squares.discover(x, y);
            if (!isSafe) {
                this.squares.discoverAll();
                engine.pushScene(new GameOver());
            }
            else if (this.squares.isAllDiscovered()) {
                engine.pushScene(new GameClear());
            }
        }
        if (pointer.right) {
            const square = this.squares.getSquare(x, y);
            square.flag = !square.flag;
        }
    }
    render(context, width, height) {
        context.fillStyle = 'navy';
        context.fillRect(0, 0, width, height);

        this.squares.render(context);
    }
}

export default Main;