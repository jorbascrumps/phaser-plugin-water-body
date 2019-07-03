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
This will render a body of water, but it will not allow it to interact with your world. There is no feasible way to create an out of the box solution for all games so it is up to you to configure this to your needs.

You will need to setup collisions for any possible object you'd like to interact with. You are also responsible for determining where an impact has occurred as well as how large of an impact it was. I recommend using the excellent [phaser-matter-collision-plugin](https://www.npmjs.com/package/phaser-matter-collision-plugin) but ultimately it is up to you.
```js
this.collision.addOnCollideStart({
    objectA: waterBody.sensor,
    callback: ({ gameObjectA: waterBody, gameObjectB, }) => {

        // Find the surface position directly under the colliding game object
        const impactPosition = waterBody.columns.findIndex((col, i) => col.x >= gameObjectB.x && i);

        // Calculate speed of game object on impact
        const speed = gameObjectB.body.speed * 3;

        // More speed means more droplets
        const numDroplets = Math.ceil(gameObjectB.body.speed) * 5;

        // Slow the colliding game object down
        gameObjectB.setFrictionAir(0.25);

        // Splash!
        waterBody.splash(impactPosition, speed, numDroplets);
    },
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
