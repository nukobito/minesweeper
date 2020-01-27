import Scene from "../scene.js";
import Main from "./main.js";

class GameClear extends Scene {
    update(timeStamp, pointer, engine) {
        if (pointer.left) {
            engine.popScene();
            engine.replaceScene(new Main());
        }
    }
    render(context, width, height) {
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.fillRect(0, 0, width, height);

        context.fillStyle = 'white';
        context.font = 'bold 32px sans-serif';
        context.fillText('CLEAR', 80, 128);
    }
}

export default GameClear;