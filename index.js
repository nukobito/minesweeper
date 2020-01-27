import Engine from "./engine.js";
import Main from "./scenes/main.js";

addEventListener('load', () => {
    const engine = new Engine(288, 288);
    engine.pushScene(new Main());
    engine.start();
});