class Engine {
    constructor(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const pointer = {
            x: 0, y: 0,
            left: false, right: false
        };
        canvas.addEventListener('contextmenu', event => { event.preventDefault(); });
        canvas.addEventListener('pointerdown', event => {
            const { left, top } = canvas.getBoundingClientRect();
            const [x, y] = [
                event.clientX - left,
                event.clientY - top
            ];
            pointer.x = x;
            pointer.y = y;
            switch (event.button) {
                case 0: pointer.left = true; break;
                case 2: pointer.right = true; break;
            }
        });
        document.body.appendChild(canvas);
        const context = canvas.getContext('2d');

        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;

        this.pointer = pointer;

        this.context = context;

        this.initials = [];
        this.scenes = [];
    }
    pushScene(scene) {
        this.initials.push(scene);
    }
    popScene() {
        return this.scenes.pop();
    }
    replaceScene(scene) {
        const oldScene = this.popScene();
        this.pushScene(scene);
        return oldScene;
    }
    start() {
        const loop = timeStamp => {
            requestAnimationFrame(loop);

            for (const scene of this.initials) {
                scene.initial(this);
                this.scenes.push(scene);
            }
            this.initials = [];

            const lastIndex = this.scenes.length - 1;
            if (lastIndex >= 0) {
                const lastScene = this.scenes[lastIndex];
                lastScene.update(timeStamp, this.pointer, this);
            }
            this.pointer.left = false;
            this.pointer.right = false;
    
            for (const scene of this.scenes) {
                scene.render(this.context, this.width, this.height);
            }
        };
        loop(0);
    }
}

export default Engine;