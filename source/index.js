import WaterBody from './WaterBody';

export default class WaterBodyPlugin extends Phaser.Plugins.ScenePlugin {

    #bodies = []

    constructor (scene, pluginManager) {
        super(scene, pluginManager);

        pluginManager.registerGameObject('water', this.createWaterBody);
    }

    createWaterBody = (x, y, width, height, depth, config) => {
        const body = new WaterBody(this.scene, x, y, width, height, depth, config);

        this.#bodies.push(body);

        return body;
    }

    boot () {
        this.systems.events.on('update', this.update, this);
    }

    update() {
        for (const body of this.#bodies) {
            body.update();
        }
    }

    get bodies () {
        return this.#bodies;
    }

}
