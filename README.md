# Phaser Water Body Plugin
[View demo](https://jorbascrumps.github.io/phaser-plugin-water-body/)

## Installation
```
npm i phaser-plugin-water-body -S
```
Then add to your game config:
```js
import WaterBodyPlugin from 'phaser-plugin-water-body';

new Phaser.Game({
    plugins: [
        scene: [
            {
                key: 'WaterBodyPlugin',
                mapping: 'waterplugin',
                plugin: WaterBodyPlugin,
                start: true,
            }
        ]
    ]
});
```

## Basic Usage
The plugin registers a new custom `Game Object` that is available from within your scenes:
```javascript
const waterBody = this.add.water(0, 0, 600, 600, 350, {
    texture: 'water',
});
```

## API

### WaterBody(x, y, width, height, depth, options)
#### Arguments
Argument | Type | Default | Description
--- | --- | --- | ---
**x** | Number | 0 | The x position to render the body
**y** | Number | 0 | The y position to render the body
**width** | Number | 100 | The width to render the body
**height** | Number | 100 | The height to render the body
**depth** | Number | 100 | The depth of water in the body (Note: cannot be larger than the height)
**options.texture** | String | undefined | The texture key to use as the surface image (Note: currently required)

**Returns** a `WaterBody` object.

## TODO
- [ ] Additional documentation
- [x] Demo
- [ ] Fallback surface colour if texture is not provided
- [ ] Resize after creation
- [ ] Dynamic runtime depth
