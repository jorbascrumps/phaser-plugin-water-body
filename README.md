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
        global: [
            {
                key: 'WaterBodyPlugin',
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
    texture: 'water', // Currently required..
});
```

## API

### `WaterBody(x, y, width, height, depth, options)`
_Create a new WaterBody object in the Scene._
#### Arguments
* **x** (Number) &mdash; The x position to render the body. Default value is `0`.
* **y** (Number) &mdash; The y position to render the body. Default value is `0`.
* **width** (Number) &mdash; The width to render the bodyy. Default value is `100`.
* **height** (Number) &mdash; The height to render the bodyy. Default value is `100`.
* **depth** (Number) &mdash; The depth of water in the body (Note: cannot be larger than the height). Default value is `100`.
* **options** (Object) &mdash; An object containing the following optional properties:
  * **texture** (String) &mdash; The texture key to use as the surface image **(Note: currently required)**

**Returns** a `WaterBody` object.

## TODO
- [ ] Additional documentation
- [x] Demo
- [ ] Fallback surface colour if texture is not provided
- [ ] Resize after creation
- [ ] Dynamic runtime depth
- [ ] Support for floating objects
