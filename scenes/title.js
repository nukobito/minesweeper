import Scene from "../scene.js";

class Title extends Scene {
    update(timeStamp, pointer, engine) {
        if (pointer.left) {
            engine.popScene();
        }
    }
    render(context, width, height) {
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.fillRect(0, 0, width, height);

        context.fillStyle = 'white';
        context.font = 'bold 32px sans-serif';
        context.fillText('MINESWEEPER', 16, 128);
    }
}

export default Title;