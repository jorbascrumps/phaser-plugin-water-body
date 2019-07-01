import WaterBody from './WaterBody';

export default class WaterBodyPlugin extends Phaser.Plugins.BasePlugin {

    constructor (pluginManager) {
        super(pluginManager);

        pluginManager.registerGameObject('water', this.createWaterBody);
    }

    createWaterBody (x, y, width, height, depth, config) {
        return new WaterBody(this.scene, x, y, width, height, depth, config);
    }

}
